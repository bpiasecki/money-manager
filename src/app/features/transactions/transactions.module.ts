import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/material.module';
import { TransactionsComponent } from './components/transactions-page/transactions.component';


@NgModule({
  declarations: [
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [],
  providers: [],
})
export class TransactionsModule { }
