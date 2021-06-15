import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '@core/db/db.service';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { CategoryItem } from '@core/models/categories/categoryItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { FilterType, TransactionFilterItem } from '@core/models/transactions/transactionFilterItem.model';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';
import { TransactionType, TransactionTypes } from '@core/models/transactions/transactionType.model';
import { TransactionFilterComponent } from '@features/transaction-filter/transaction-filter.component';
import { ShowHideDialogAnimation } from '@shared/animations/showHideDialog.animation';
import { ShowHideMainPage } from '@shared/animations/showHideMainPage.animation';
import { TransactionsService } from '@shared/services/transactions.service';
import { ColumnMode, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mm-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: [ShowHideMainPage]
})
export class TransactionsComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription();

  public SortType = SortType;
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;
  public TransactionType = TransactionType;

  public showPage: boolean = true;

  public accounts: ItemKeyWithData<WalletItem>[];
  public categories: ItemKeyWithData<CategoryItem>[];

  public transactionFilters = [
    new TransactionFilterItem('Typ', FilterType.TransactionType, TransactionTypes),
    new TransactionFilterItem('Data', FilterType.Date),
    new TransactionFilterItem('Nazwa', FilterType.Name),
    new TransactionFilterItem('Konto', FilterType.Account),
    new TransactionFilterItem('Kategoria', FilterType.Category),
    new TransactionFilterItem('Kwota', FilterType.TransactionValue),
  ]

  public transactions: ItemKeyWithData<TransactionItem>[];
  private transactionsSource: ItemKeyWithData<TransactionItem>[];

  constructor(private router: Router, private dbService: DbService, private dialogService: NgDialogAnimationService, private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.subscriptions.add(this.dbService.$transactions.subscribe((result) => {
      this.transactionsSource = [...result];
      this.transactions = result;
    }));

    this.subscriptions.add(this.dbService.$accounts.subscribe((result) => {
      this.accounts = result;

      const accountsFilterItem = this.transactionFilters.find(item => item.name == 'Konto');
      if (accountsFilterItem)
        accountsFilterItem.listItems = this.accounts;
    }));

    this.subscriptions.add(this.dbService.$categories.subscribe((result) => {
      this.categories = result;
      const categoriesFilterItem = this.transactionFilters.find(item => item.name == 'Kategoria');
      if (categoriesFilterItem)
        categoriesFilterItem.listItems = result;
    }
    ));
  }

  public filterItems() {
    let transactions = [...this.transactionsSource];
    this.transactionFilters.forEach(fItem => {
      transactions = transactions.filter(item => fItem.filterFn ? fItem.filterFn(item.data, fItem.value, fItem.addictionalValue) : () => true)
    });
    this.transactions = transactions;
  }

  public openFilterDialog(filterItem: TransactionFilterItem) {
    const dialogRef = this.dialogService.open(TransactionFilterComponent, {
      data: { ...filterItem } as TransactionFilterItem,
      animation: ShowHideDialogAnimation
    });

    dialogRef.afterClosed().subscribe((result: TransactionFilterItem) => {
      if (!result)
        return;

      filterItem.visibleName = result.visibleName;
      filterItem.value = result.value;
      filterItem.addictionalValue = result.addictionalValue;
      filterItem.filterFn = result.filterFn;

      this.filterItems();
    })
  }

  public addTransaction() {
    this.showPage = false;
    setTimeout(() => {
      this.router.navigate(['/transactionAddEdit'])
    }, 200);
  }

  public editTransaction(event: any) {
    if (event.type == 'click') {
      this.showPage = false;
      setTimeout(() => {
        this.router.navigate(['/transactionAddEdit/', { id: event.row.key }])
      }, 200);
    }
  }

  public removeTransaction(item: ItemKeyWithData<TransactionItem>) {
    this.transactionsService.removeItem(item.key);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
