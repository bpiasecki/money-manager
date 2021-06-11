import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '@core/db/db.service';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';
import { TransactionType, TransactionTypes, TransactionTypeViewItem } from '@core/models/transactions/transactionType.model';
import { PreventInitialChildAnimations } from '@shared/animations/preventInitialChildAnimations.animation';
import { ShowHideButtonAnimation } from '@shared/animations/showHideButton.animation';
import { ShowHideCheckboxAnimation } from '@shared/animations/showHideCheckbox.animation';
import { ShowHideEditPage } from '@shared/animations/showHideEditPage.animation';
import { ShowHideFormFieldAnimation } from '@shared/animations/showHideFormField.animation';
import { CategoryPickerComponent } from '@shared/custom-components/category-picker/category-picker.component';
import { RemoveConfirmDialogComponent } from '@shared/custom-components/remove-confirm-dialog/remove-confirm-dialog.component';
import { AccountsService } from '@shared/services/accounts.service';
import { CategoriesService } from '@shared/services/categories.service';
import { TransactionsService } from '@shared/services/transactions.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { from, Observable, of } from 'rxjs';
import { filter, finalize, first, map, switchMap, switchMapTo } from 'rxjs/operators';


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
  public transactionTypeList: TransactionTypeViewItem[] = TransactionTypes;

  public showPage: boolean = true;
  public transaction: TransactionItem;
  public itemKey: string | undefined;
  public accounts: ItemKeyWithData<WalletItem>[];
  public $categoryName: Observable<string | null>;
  private itemBeforeEdit: TransactionItem;

  constructor(
    private transactionsService: TransactionsService,
    private accountsService: AccountsService,
    private categoriesService: CategoriesService,
    private dbService: DbService,
    private location: Location,
    private route: ActivatedRoute,
    private dialogService: NgDialogAnimationService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params) => {
      this.itemKey = params['id'];
      const accountKey = params['account'];
      const transactionType = params['transactionType'];

      return this.dbService.$accounts.pipe(
        switchMap((accounts) => {
          const defaultAccount = accounts.find(item => item.data.isDefault === true);
          this.accounts = accounts;
          return this.dbService.getTransaction(this.itemKey).pipe(
            map((item) => {
              this.$categoryName = this.dbService.getCategoryNameWithParent(item.category);
              if (accountKey)
                item.sourceAccount = item.targetAccount = accountKey;
              else if (transactionType)
                item.type = transactionType;
              else if (!this.itemKey)
                item.sourceAccount = item.targetAccount = defaultAccount?.key
              else if (this.itemBeforeEdit === undefined)
                this.itemBeforeEdit = { ...item };

              return item;
            })
          )
        }),
        first()
      )
    })).subscribe((result) => this.transaction = result);
  }

  public addEditTransaction(transaction: TransactionItem): void {
    const itemToSave = this.getTransactionToSave(transaction);

    if (this.itemKey)
      this.transactionsService.updateItem(this.itemKey, itemToSave).then(() =>
        this.editAccountBalance(itemToSave).pipe(first()).subscribe(() => this.closePanel())
      );
    else
      this.transactionsService.addNewItem(itemToSave).then(() =>
        this.editAccountBalance(itemToSave).pipe(first()).subscribe(() => this.closePanel())
      );
  }

  private editAccountBalance(itemToSave: TransactionItem, revert?: boolean): Observable<void> {
    if (!this.itemKey || revert !== undefined) {
      switch (itemToSave.type) {
        case TransactionType.Expense:
          return this.handleExpenseTransaction(itemToSave, revert);
        case TransactionType.Income:
          return this.handleIncomeTransaction(itemToSave, revert);
        case TransactionType.Transfer:
          return this.handleTransferTransaction(itemToSave, revert);
        default:
          return of(void 0);
      }
    } else
      return this.editAccountBalance(this.itemBeforeEdit, true).pipe(first(), switchMapTo(this.editAccountBalance(itemToSave, false)))
  }

  private handleExpenseTransaction(itemToSave: TransactionItem, revert?: boolean): Observable<void> {
    const account = this.accounts.find(item => item.key == itemToSave.sourceAccount);
    if (account) {
      revert ? account.data.balance += itemToSave.value : account.data.balance -= itemToSave.value;
      return from(this.accountsService.updateItem(account.key, account.data));
    } else return of(void 0);
  }

  private handleIncomeTransaction(itemToSave: TransactionItem, revert?: boolean): Observable<void> {
    const account = this.accounts.find(item => item.key == itemToSave.targetAccount);
    if (account) {
      revert ? account.data.balance -= itemToSave.value : account.data.balance += itemToSave.value;
      return from(this.accountsService.updateItem(account.key, account.data));
    } else return of(void 0);
  }

  private handleTransferTransaction(itemToSave: TransactionItem, revert?: boolean): Observable<void> {
    const sourceAccount = this.accounts.find(item => item.key == itemToSave.sourceAccount);
    const targetAccount = this.accounts.find(item => item.key == itemToSave.targetAccount);
    if (sourceAccount && targetAccount) {
      revert ? sourceAccount.data.balance += itemToSave.value : sourceAccount.data.balance -= itemToSave.value;
      revert ? targetAccount.data.balance -= itemToSave.value : targetAccount.data.balance += itemToSave.value;
      return from(this.accountsService.updateItem(sourceAccount.key, sourceAccount.data).then(() =>
        this.accountsService.updateItem(targetAccount.key, targetAccount.data)));
    } else return of(void 0);
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
    this.dialogService.open(RemoveConfirmDialogComponent, {
      data: `Czy na pewno chcesz usunąć wybraną transakcję?`
    }).afterClosed()
      .pipe(filter(confirmed => confirmed === true))
      .subscribe(() => {
        if (this.itemKey) {
          this.editAccountBalance(this.itemBeforeEdit, true).pipe(
            switchMapTo(from(this.transactionsService.removeItem(this.itemKey))),
            finalize(() => this.closePanel())
          ).subscribe();
        }
      });
  }

  public pickCategory(transaction: TransactionItem) {
    const dialogRef = this.dialogService.open(CategoryPickerComponent, {
      data: transaction.category,
      animation: this.getDialogAnimation()
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result)
        return;
      if (transaction.category != result) {
        transaction.category = result;
        this.$categoryName = this.dbService.getCategoryNameWithParent(result);
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


