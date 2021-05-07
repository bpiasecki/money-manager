import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAction, AngularFireDatabase } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { MatDialogRef } from '@angular/material/dialog/';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';
import { AuthService } from '@core/services/auth.service';
import { BaseService } from '@core/services/base.service';
import { DialogService } from '@core/services/dialog.service';
import { AccountsComponent } from '@features/accounts/components/accounts-page/accounts.component';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'mm-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  items$: Observable<AngularFireAction<DataSnapshot>[]>;
  value$: BehaviorSubject<number | null>;
  userId: string | undefined;
  subscriptions = new Subscription();
  dialogRef: MatDialogRef<AccountsComponent>;
  isPanelOpened: boolean = false;

  constructor(private db: AngularFireDatabase, private authService: AuthService, private baseService: BaseService, private dialogService: DialogService<AccountsComponent>) {
    this.authService.user.then((user) => this.userId = user?.uid);

    this.subscriptions.add(this.baseService.$addNewItem.subscribe(() => {
      this.dialogRef = this.dialogService.open(AccountsComponent)
    }));
  }

  ngOnInit() {
    if (this.userId) {
      this.value$ = new BehaviorSubject<number | null>(null);
      this.items$ = this.value$.pipe(
        switchMap(value =>
          this.db.list('transactions/' + this.userId, ref =>
            value ? ref.orderByChild('value').equalTo(value) : ref
          ).snapshotChanges()
        )
      );
    }
  }

  filterBy(value: number | null) {
    this.value$.next(value);
  }

  addItem(value: number) {
    const transactionItem = new TransactionItem();
    transactionItem.value = value;
    transactionItem.name = 'sklep1';
    this.db.list('transactions/' + this.userId).push(transactionItem)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
