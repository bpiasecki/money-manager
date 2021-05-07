import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/material.module';
import { AccountsComponent } from './components/accounts-page/accounts.component';


@NgModule({
  declarations: [
    AccountsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [],
  providers: [],
})
export class AccountsModule { }
