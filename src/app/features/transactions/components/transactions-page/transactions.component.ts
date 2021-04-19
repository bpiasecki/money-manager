import { Component, OnInit } from '@angular/core';
import { AngularFireAction, AngularFireDatabase } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { AuthService } from '@core/services/auth.service';
import { TransactionItem } from '@shared/models/transactions/transactionItem.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'mm-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  items$: Observable<AngularFireAction<DataSnapshot>[]>;
  value$: BehaviorSubject<number | null>;
  userId: string | undefined;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.authService.user.then((user) => this.userId = user?.uid)
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

}
