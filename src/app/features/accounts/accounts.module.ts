import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@shared/shared.module';
import { AccountAddComponent } from './components/account-add/account-add.component';
import { AccountsComponent } from './components/accounts-page/accounts.component';


@NgModule({
  declarations: [
    AccountsComponent,
    AccountAddComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
  ],
  exports: [],
  providers: [],
})
export class AccountsModule { }
