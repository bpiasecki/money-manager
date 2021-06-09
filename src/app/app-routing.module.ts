import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/auth/auth-guard.service';
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
  { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard]},
  { path: 'accountAddEdit', component: AccountAddEditComponent, canActivate: [AuthGuard] },
  { path: 'accountAddEdit/:id', component: AccountAddEditComponent, canActivate: [AuthGuard] },
  { path: 'transactionAddEdit', component: TransactionAddEditComponent, canActivate: [AuthGuard] },
  { path: 'transactionAddEdit/:param', component: TransactionAddEditComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'accounts'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
