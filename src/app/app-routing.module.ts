import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountAddEditComponent } from '@features/accounts/components/account-add-edit/account-add-edit.component';
import { AccountsComponent } from '@features/accounts/components/accounts-page/accounts.component';
import { OverviewComponent } from '@features/overview/components/overview-page/overview.component';
import { TransactionsComponent } from '@features/transactions/components/transactions-page/transactions.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'accountAdd', component: AccountAddEditComponent },
  { path: 'accountAdd/:id', component: AccountAddEditComponent },
  { path: 'transactions', component: TransactionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
