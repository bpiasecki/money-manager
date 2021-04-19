import { Component, OnInit } from '@angular/core';
import { AngularFireAction, AngularFireDatabase, AngularFireList, QueryFn } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DbUserItemList } from '../shared/models/dbUserItemList.model';
import { TransactionItem } from '../shared/models/transactions/transactionItem.model';

@Component({
  selector: 'mm-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  //   private userId: string | undefined;
  //   public transactions: AngularFireList<TransactionItem>;
  //   public data: Observable<TransactionItem[]>;

  //   constructor(private db: AngularFireDatabase, private authService: AuthService) {
  //     this.authService.user.then((user) => this.userId = user?.uid)
  //   }

  //   ngOnInit(): void {
  //     if (this.userId) {
  //       this.transactions = this.db.list('transactions/' + this.userId, ref => ref.equalTo('large'));
  //     // this.transactions.snapshotChanges().subscribe(res => {console.log('sanpshotChanges'); console.log(res);})
  //     // this.transactions.stateChanges().subscribe(res => {console.log('stateChanges'); console.log(res);})
  //     this.data = this.transactions.valueChanges()
  //   }
  // }

  // addItem(value: number) {
  //   const transactionItem = new TransactionItem();
  //   transactionItem.value = value;
  //   transactionItem.name = 'sklep1';
  //   this.transactions.push(transactionItem)
  // }

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
