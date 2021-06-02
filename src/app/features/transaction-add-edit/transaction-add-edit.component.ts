import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';
import { TransactionType } from '@core/models/transactions/transactionType.model';
import { DbService } from '@core/services/db.service';
import { PreventInitialChildAnimations } from '@shared/animations/preventInitialChildAnimations.animation';
import { ShowHideButtonAnimation } from '@shared/animations/showHideButton.animation';
import { ShowHideCheckboxAnimation } from '@shared/animations/showHideCheckbox.animation';
import { ShowHideEditPage } from '@shared/animations/showHideEditPage.animation';
import { ShowHideFormFieldAnimation } from '@shared/animations/showHideFormField.animation';
import { CategoryPickerComponent } from '@shared/custom-components/category-picker/category-picker.component';
import { CategoriesService } from '@shared/services/categories.service';
import { TransactionsService } from '@shared/services/transactions.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';


@Component({
  selector: 'mm-transaction-add-edit',
  templateUrl: './transaction-add-edit.component.html',
  styleUrls: ['./transaction-add-edit.component.scss'],
  animations: [
    ShowHideButtonAnimation,
    ShowHideCheckboxAnimation,
    PreventInitialChildAnimations,
    ShowHideEditPage,
    ShowHideFormFieldAnimation
  ]
})
export class TransactionAddEditComponent implements OnInit {

  public TransactionTypes = TransactionType;

  public showPage: boolean = true;
  public $transaction: Observable<TransactionItem>;
  public itemKey: string | undefined;
  public $accounts: Observable<ItemKeyWithData<WalletItem>[]>;
  public $categoryName: Observable<string | null>;

  constructor(private transactionsService: TransactionsService, private categoriesService: CategoriesService, private dbService: DbService, private location: Location, private route: ActivatedRoute, private dialogService: NgDialogAnimationService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.itemKey = params['id'];
      const accountKey = params['account'];
      const transactionType = params['transactionType'];

      this.dbService.$accounts.pipe(
        first(),
        tap((accounts) => {
          const defaultAccount = accounts.find(item => item.data.isDefault === true);
          this.$accounts = this.dbService.$accounts;
          this.$transaction = this.transactionsService.getItem(this.itemKey).pipe(tap((item) => {
            this.$categoryName = this.categoriesService.getCategoryNameWithParent(item.category);
            if (accountKey)
              item.sourceAccount = item.targetAccount = accountKey;
            else if (transactionType)
              item.type = transactionType;
            else if (!this.itemKey)
              item.sourceAccount = item.targetAccount = defaultAccount?.key
          }))
        })).subscribe();
    })

  }

  public addEditTransaction(transaction: TransactionItem): void {
    const itemToSave = this.getTransactionToSave(transaction);

    if (this.itemKey)
      this.transactionsService.updateItem(this.itemKey, itemToSave).then(() => this.closePanel());
    else
      this.transactionsService.addNewItem(itemToSave).then(() => this.closePanel());
  }

  private getTransactionToSave(transaction: TransactionItem): TransactionItem {
    const itemToSave: TransactionItem = { ...transaction };
    itemToSave.transactionDate = new Date(transaction.transactionDate)?.toISOString();

    switch (itemToSave.type) {
      case TransactionType.Expense:
        delete itemToSave.targetAccount;
        break;
      case TransactionType.Income:
        delete itemToSave.sourceAccount;
        break;
      default:
        break;
    }

    return itemToSave;
  }

  public removeTransaction() {
    if (this.itemKey)
      this.transactionsService.removeItem(this.itemKey).then(() => this.closePanel())
  }

  public pickCategory(transaction: TransactionItem) {
    const dialogRef = this.dialogService.open(CategoryPickerComponent, {
      data: transaction.category,
      animation: this.getDialogAnimation()
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (transaction.category != result) {
        transaction.category = result;
        this.$categoryName = this.categoriesService.getCategoryNameWithParent(result);
      }
    })
  }

  private getDialogAnimation() {
    const animation = {
      incomingOptions: {
        keyframes: [
          { opacity: '0', transform: 'scale(0.7)' },
          { opacity: '1', transform: 'scale(1)' }
        ],
        keyframeAnimationOptions: { easing: 'ease-in-out', duration: 300 }
      },
      outgoingOptions: {
        keyframes: [
          { opacity: '1', transform: 'scale(1)' },
          { opacity: '0', transform: 'scale(1.3)' }
        ],
        keyframeAnimationOptions: { easing: 'ease-in-out', duration: 300 }
      }
    }

    return animation;
  }

  public closePanel(): void {
    this.showPage = false;
    setTimeout(() => {
      this.location.back()
    }, 200);
  }
}


