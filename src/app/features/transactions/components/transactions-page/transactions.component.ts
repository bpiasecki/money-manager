import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog/';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';
import { AccountsComponent } from '@features/accounts/components/accounts-page/accounts.component';
import { ShowHideMainPage } from '@shared/animations/showHideMainPage.animation';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'mm-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: [ShowHideMainPage]
})
export class TransactionsComponent implements OnInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent

  // items$: Observable<AngularFireAction<DataSnapshot>[]>;
  value$: BehaviorSubject<number | null>;
  userId: string | undefined;
  subscriptions = new Subscription();
  dialogRef: MatDialogRef<AccountsComponent>;
  isPanelOpened: boolean = false;

  $items: Observable<ItemKeyWithData<TransactionItem>[]>;
  dataSource = new MatTableDataSource<ItemKeyWithData<TransactionItem>>();
  displayedColumns: string[] = ['key', 'data.name'];
  showPage: boolean = true;

  data: any;
  columns = [
    { prop: 'id' },
    { name: 'name' },
    { name: 'phone' },
    // { name: 'company' },
    // { name: 'date' },
    // { name: 'phone' },
  ];
  optionsBasicNoData: { emptyDataMessage: string; };
  options = {}
  ColumnMode = ColumnMode;
  filteredData: { id: string; name: string; phone: string; company: string; zip: string; city: string; date: string; country: string; }[];

  constructor(private router: Router) {
    this.$items = of([
      new ItemKeyWithData("aaaaa", new TransactionItem("pierwsza transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("druga transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("trzecia transakcja")),
      new ItemKeyWithData("aaaaa", new TransactionItem("pierwsza transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("druga transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("trzecia transakcja")),
      new ItemKeyWithData("aaaaa", new TransactionItem("pierwsza transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("druga transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("trzecia transakcja")),
      new ItemKeyWithData("aaaaa", new TransactionItem("pierwsza transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("druga transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("trzecia transakcja")),
      new ItemKeyWithData("aaaaa", new TransactionItem("pierwsza transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("druga transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("trzecia transakcja")),
      new ItemKeyWithData("aaaaa", new TransactionItem("pierwsza transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("druga transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("trzecia transakcja")),
      new ItemKeyWithData("aaaaa", new TransactionItem("pierwsza transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("druga transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("trzecia transakcja")),
      new ItemKeyWithData("aaaaa", new TransactionItem("pierwsza transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("druga transakcja")),
      new ItemKeyWithData("bbbb", new TransactionItem("trzecia transakcja"))
    ])
    this.$items.subscribe((res) => {
      this.dataSource.data = res;
    })
  }
  
  ngOnInit() {
    this.data = this.getData();
    this.filteredData = this.getData();
    // if (this.userId) {
    //   this.value$ = new BehaviorSubject<number | null>(null);
    //   this.items$ = this.value$.pipe(
    //     switchMap(value =>
    //       this.db.list('transactions/' + this.userId, ref =>
    //         value ? ref.orderByChild('value').equalTo(value) : ref
    //       ).snapshotChanges()
    //     )
    //   );
    // }
    }

  // filterBy(value: number | null) {
  //   this.value$.next(value);
  // }

  // addItem(value: number) {
  //   const transactionItem = new TransactionItem();
  //   transactionItem.value = value;
  //   transactionItem.name = 'sklep1';
  //   this.db.list('transactions/' + this.userId).push(transactionItem)
  // }

  filterDatatable(event: any){
    // get the value of the key pressed and make it lowercase
    let val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    let colsAmt = this.columns.length;
    // get the key names of each column in the dataset
    let keys = Object.keys(this.data[0]);
    // assign filtered matches to the active datatable
    this.filteredData = this.data.filter((item: any) => {
      // iterate through each row's column data
      for (let i=0; i<colsAmt; i++){
        // check for a match
        if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val){
          // found match, return true to add to result set
          return true;
        }
      }
      return false;
    });
    
    this.datatable.offset = 0;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public addTransaction() {
    this.router.navigate(['/transactionAddEdit'])
  }

  public editTransaction(row: any) {
    console.log(row)
    this.router.navigate(['/transactionAddEdit/' + row.id])
  }



  public getData() {
    return [
      {
        "id": "1",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "ZEnim Commodo Limited Enim Commodo Limited Enim Commodo LimitedEnim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "2",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "ZOdio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "3",
        "name": "qwBrendan",
        "phone": "1-724-406-2487",
        "company": "YEnim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "4",
        "name": "rarren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "5",
        "name": "dssendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "6",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "7",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "8",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "9",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "10",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "11",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "12",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "13",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "14",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "15",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "16",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "17",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "18",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "19",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "20",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "21",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "22",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "23",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "Enim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "24",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "Odio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      },
      {
        "id": "25",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "ZEnim Commodo Limited Enim Commodo Limited Enim Commodo LimitedEnim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      }
    ];
  }



}
