import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';
import { TransactionType } from '@core/models/transactions/transactionType.model';
import { DbService } from '@core/services/db.service';
import { TransactionsService } from '@features/transactions/services/transactions.service';
import { PreventInitialChildAnimations } from '@shared/animations/preventInitialChildAnimations.animation';
import { ShowHideButtonAnimation } from '@shared/animations/showHideButton.animation';
import { ShowHideCheckboxAnimation } from '@shared/animations/showHideCheckbox.animation';
import { ShowHideEditPage } from '@shared/animations/showHideEditPage.animation';
import { ShowHideFormFieldAnimation } from '@shared/animations/showHideFormField.animation';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


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

  constructor(private transactionsService: TransactionsService, private dbService: DbService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.$accounts = this.dbService.$accounts;
    this.route.params.subscribe((params) => {
      this.itemKey = params['id'];
      const accountKey = params['account'];
      const transactionType = params['transactionType'];
      
      const transaction = this.transactionsService.getItem(this.itemKey);

      if (accountKey)
        this.$transaction = transaction.pipe(tap((result) => result.sourceAccount = result.targetAccount = accountKey));
      else if (transactionType)
        this.$transaction = transaction.pipe(tap((result) => result.type = transactionType));
      else
        this.$transaction = transaction;

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
    if(this.itemKey)
      this.transactionsService.removeItem(this.itemKey).then(() => this.closePanel())
  }

  public closePanel(): void {
    this.showPage = false;
    setTimeout(() => {
      this.location.back()
    }, 200);
  }
}


