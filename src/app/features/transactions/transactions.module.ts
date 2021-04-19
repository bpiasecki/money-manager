import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { TransactionsComponent } from './components/transactions-page/transactions.component';
import { TransactionsRoutingModule } from './transactions-routing.module';


@NgModule({
  declarations: [
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule
  ],
  exports: [],
  providers: [],
})
export class TransactionsModule { }
