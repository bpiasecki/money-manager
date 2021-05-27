import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountsService } from '@features/accounts/services/accounts.service';
import { MaterialModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TransactionAddEditComponent } from './components/transaction-add-edit/transaction-add-edit.component';
import { TransactionsComponent } from './components/transactions-page/transactions.component';
import { TransactionsService } from './services/transactions.service';


@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionAddEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    NgScrollbarModule,
    NgxDatatableModule
  ],
  exports: [],
  providers: [
    TransactionsService, AccountsService
  ],
})
export class TransactionsModule { }
