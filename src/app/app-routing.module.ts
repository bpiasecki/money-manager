import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccountAddEditComponent } from '@features/account-add-edit/account-add-edit.component';
import { AccountsComponent } from '@features/accounts-page/accounts.component';
import { TransactionAddEditComponent } from '@features/transaction-add-edit/transaction-add-edit.component';
import { TransactionsComponent } from '@features/transactions-page/transactions.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register-user/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'accounts', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'accounts', component: AccountsComponent, },
  { path: 'accountAddEdit', component: AccountAddEditComponent },
  { path: 'accountAddEdit/:id', component: AccountAddEditComponent },
  { path: 'transactionAddEdit', component: TransactionAddEditComponent },
  { path: 'transactionAddEdit/:param', component: TransactionAddEditComponent },
  { path: 'transactions', component: TransactionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
