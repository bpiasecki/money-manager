import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog/';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DbService } from '@core/db/db.service';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { CategoryItem } from '@core/models/categories/categoryItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';
import { TransactionType } from '@core/models/transactions/transactionType.model';
import { AccountsComponent } from '@features/accounts-page/accounts.component';
import { ShowHideMainPage } from '@shared/animations/showHideMainPage.animation';
import { TransactionsService } from '@shared/services/transactions.service';
import { ColumnMode, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'mm-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: [ShowHideMainPage]
})
export class TransactionsComponent implements OnInit, OnDestroy {

  userId: string | undefined;
  subscriptions = new Subscription();
  dialogRef: MatDialogRef<AccountsComponent>;
  isPanelOpened: boolean = false;


  SortType = SortType;
  SelectionType = SelectionType;
  ColumnMode = ColumnMode;
  TransactionType = TransactionType;

  $items: Observable<ItemKeyWithData<TransactionItem>[]>;
  dataSource = new MatTableDataSource<ItemKeyWithData<TransactionItem>>();
  public showPage: boolean = true;

  public optionsBasicNoData: { emptyDataMessage: "Brak transakcji do wyświetlenia"; };
  public accounts: ItemKeyWithData<WalletItem>[];
  public categories: ItemKeyWithData<CategoryItem>[];

  constructor(private router: Router, private dbService: DbService, private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.$items = this.dbService.$transactions;
    this.subscriptions.add(this.dbService.$accounts.subscribe((result) => {
      this.accounts = result;
    }));
    
    this.subscriptions.add(this.dbService.$categories.subscribe((result) => this.categories = result));
  }

  filterDatatable(event: any) {

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
        this.router.navigate(['/transactionAddEdit/', {id: event.row.key}])
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
