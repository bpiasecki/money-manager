import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TransactionsComponent } from './components/transactions-page/transactions.component';
import { TransactionAddEditComponent } from './components/transaction-add-edit/transaction-add-edit.component';


@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionAddEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgScrollbarModule,
    NgxDatatableModule
  ],
  exports: [],
  providers: [],
})
export class TransactionsModule { }
