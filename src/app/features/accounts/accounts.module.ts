import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@shared/shared.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AccountAddEditComponent } from './components/account-add-edit/account-add-edit.component';
import { AccountsComponent } from './components/accounts-page/accounts.component';
import { AccountsService } from './services/accounts.service';


@NgModule({
  declarations: [
    AccountsComponent,
    AccountAddEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    NgScrollbarModule,
  ],
  exports: [],
  providers: [AccountsService],
})
export class AccountsModule { }
