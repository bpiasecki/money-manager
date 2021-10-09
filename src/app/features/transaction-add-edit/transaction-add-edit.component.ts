import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '@core/db/db.service';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';
import { TransactionType, TransactionTypes, TransactionTypeViewItem } from '@core/models/transactions/transactionType.model';
import { PreventInitialChildAnimations } from '@shared/animations/preventInitialChildAnimations.animation';
import { ShowHideButtonAnimation } from '@shared/animations/showHideButton.animation';
import { ShowHideCheckboxAnimation } from '@shared/animations/showHideCheckbox.animation';
import { ShowHideDialogAnimation } from '@shared/animations/showHideDialog.animation';
import { ShowHideEditPage } from '@shared/animations/showHideEditPage.animation';
import { ShowHideFormFieldAnimation } from '@shared/animations/showHideFormField.animation';
import { CategoryPickerComponent } from '@shared/custom-components/category-picker/category-picker.component';
import { RemoveConfirmDialogComponent } from '@shared/custom-components/remove-confirm-dialog/remove-confirm-dialog.component';
import { AccountsService } from '@shared/services/accounts.service';
import { TransactionsService } from '@shared/services/transactions.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { forkJoin, from, Observable, of } from 'rxjs';
import { filter, first, map, switchMap, switchMapTo } from 'rxjs/operators';


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
  public itemKey: number | undefined;
  public accounts: WalletItem[];
  public $categoryName: Observable<string | null>;
  private itemBeforeEdit: TransactionItem;

  constructor(
    private transactionsService: TransactionsService,
    private accountsService: AccountsService,
    private dbService: DbService,
    private location: Location,
    private route: ActivatedRoute,
    private dialogService: NgDialogAnimationService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params) => {
      this.itemKey = +params['id'];
      const accountKey = params['account'];
      const transactionType = params['transactionType'];

      return this.dbService.$accounts.pipe(
        switchMap((accounts) => {
          const defaultAccount = accounts.find(item => item.isDefault === true);
          this.accounts = accounts;
          return this.dbService.getTransaction(this.itemKey).pipe(
            map((item) => {
              this.$categoryName = this.dbService.getCategoryNameWithParent(item.categoryId);
              if (accountKey)
                item.sourceAccountId = item.targetAccountId = accountKey;
              else if (transactionType)
                item.type = transactionType;
              else if (!this.itemKey)
                item.sourceAccountId = item.targetAccountId = defaultAccount?.id
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

    const action = this.itemKey ? this.transactionsService.updateItem(this.itemKey, itemToSave) : this.transactionsService.addNewItem(itemToSave);
    action.pipe(
      switchMap((transactionDb) =>
        this.editAccountBalance(itemToSave).pipe(
          switchMapTo(forkJoin([this.dbService.refreshAccounts(), this.dbService.refreshTransactions(transactionDb)]))
        )
      )
    ).subscribe(() => this.closePanel())
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
    const account = this.accounts.find(item => item.id == itemToSave.sourceAccountId);
    if (account) {
      revert ? account.balance += itemToSave.value : account.balance -= itemToSave.value;
      return from(this.accountsService.updateItem(account.id, account));
    } else return of(void 0);
  }

  private handleIncomeTransaction(itemToSave: TransactionItem, revert?: boolean): Observable<void> {
    const account = this.accounts.find(item => item.id == itemToSave.targetAccountId);
    if (account) {
      revert ? account.balance -= itemToSave.value : account.balance += itemToSave.value;
      return from(this.accountsService.updateItem(account.id, account));
    } else return of(void 0);
  }

  private handleTransferTransaction(itemToSave: TransactionItem, revert?: boolean): Observable<void> {
    const sourceAccount = this.accounts.find(item => item.id == itemToSave.sourceAccountId);
    const targetAccount = this.accounts.find(item => item.id == itemToSave.targetAccountId);
    if (sourceAccount && targetAccount) {
      revert ? sourceAccount.balance += itemToSave.value : sourceAccount.balance -= itemToSave.value;
      revert ? targetAccount.balance -= itemToSave.value : targetAccount.balance += itemToSave.value;
      return from(this.accountsService.updateItem(sourceAccount.id, sourceAccount).pipe(switchMapTo(
        this.accountsService.updateItem(targetAccount.id, targetAccount))));
    } else return of(void 0);
  }

  private getTransactionToSave(transaction: TransactionItem): TransactionItem {
    const itemToSave: TransactionItem = { ...transaction };
    delete itemToSave.sourceAccount;
    delete itemToSave.targetAccount;

    switch (itemToSave.type) {
      case TransactionType.Expense:
        delete itemToSave.targetAccountId;
        break;
      case TransactionType.Income:
        delete itemToSave.sourceAccountId;
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
      .pipe(
        filter(confirmed => confirmed === true),
        switchMap(() => this.editAccountBalance(this.itemBeforeEdit, true).pipe(
          switchMapTo(this.transactionsService.removeItem(this.itemKey ?? 0).pipe(
            switchMapTo(forkJoin([this.dbService.refreshAccounts(), this.dbService.refreshTransactions(this.transaction, true)]))
          ))
        ))
      ).subscribe(() => this.closePanel());
  }

  public pickCategory(transaction: TransactionItem) {
    const dialogRef = this.dialogService.open(CategoryPickerComponent, {
      data: transaction.categoryId,
      animation: ShowHideDialogAnimation
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result)
        return;
      if (transaction.categoryId != result) {
        transaction.categoryId = result;
        this.$categoryName = this.dbService.getCategoryNameWithParent(result);
      }
    })
  }

  public closePanel(): void {
    this.showPage = false;
    setTimeout(() => this.location.back(), 200);
  }
}


