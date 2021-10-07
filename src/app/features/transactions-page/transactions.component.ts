import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '@core/db/db.service';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { CategoryItem } from '@core/models/categories/categoryItem.model';
import { TransactionFilterItem } from '@core/models/transactions/transactionFilterItem.model';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';
import { TransactionType } from '@core/models/transactions/transactionType.model';
import { TransactionFilterComponent } from '@features/transaction-filter/transaction-filter.component';
import { TransactionFilterService } from '@features/transaction-filter/transaction-filter.service';
import { ShowHideDialogAnimation } from '@shared/animations/showHideDialog.animation';
import { ShowHideMainPage } from '@shared/animations/showHideMainPage.animation';
import { CategoryNamePipe } from '@shared/pipes/categoryName.pipe';
import { GridAccountNamePipe } from '@shared/pipes/gridAccountName.pipe';
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

  private subscriptions = new Subscription();

  public SortType = SortType;
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;
  public TransactionType = TransactionType;

  public showPage: boolean = true;

  public transactionFilters: TransactionFilterItem[];
  public visibleFiltersLength: number;

  public accounts: WalletItem[];
  public categories: CategoryItem[];

  public transactions: TransactionItem[];
  private transactionsSource: TransactionItem[];
  
  private categoryPipe = new CategoryNamePipe();
  private accountPipe = new GridAccountNamePipe();

  public categorySortingComparator = this.categoriesComparator.bind(this);
  public accountSortingComparator = this.accountsComparator.bind(this);
  
  constructor(
    private router: Router,
    private dbService: DbService,
    private dialogService: NgDialogAnimationService,
    private transactionsService: TransactionsService,
    private transactionFilterService: TransactionFilterService
  ) { }

  ngOnInit() {
    this.transactionFilters = this.transactionFilterService.filters;

    this.subscriptions.add(this.dbService.$transactions.subscribe((result) => {
      this.transactionsSource = [...result];
      this.transactions = result;
      this.filterItems();
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
      transactions = transactions.filter(item => fItem.filterFn ? fItem.filterFn(item, fItem.value, fItem.addictionalValue) : () => true)
    });

    this.transactionFilterService.filters = this.transactionFilters;
    this.visibleFiltersLength = this.transactionFilters.filter(item => item.visibleName).length;
    this.transactions = transactions;
  }

  public clearFilters() {
    this.transactionFilters.forEach(filter => filter.filterFn = filter.visibleName = undefined);
    this.filterItems();
  }

  private categoriesComparator(firstId: number, secondId: number): -1 | 1 {
    const firstName = this.categoryPipe.transform(firstId, this.categories);
    const secondName = this.categoryPipe.transform(secondId, this.categories);

    return firstName < secondName ? -1 : 1;
  }

  private accountsComparator(firstData: TransactionItem, secondData: TransactionItem): -1 | 1 {
    const firstName = this.accountPipe.transform(firstData.sourceAccountId ?? 0, firstData.targetAccountId ?? 0, this.accounts);
    const secondName = this.accountPipe.transform(secondData.sourceAccountId ?? 0, secondData.targetAccountId ?? 0, this.accounts);

    return firstName < secondName ? -1 : 1;
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
        this.router.navigate(['/transactionAddEdit/', { id: event.row.id }])
      }, 200);
    }
  }

  public removeTransaction(item: TransactionItem) {
    this.transactionsService.removeItem(item.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
