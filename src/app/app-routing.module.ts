import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'overview', loadChildren: () => import('./features/overview/overview.module').then(m => m.OverviewModule) },
  { path: 'cards', loadChildren: () => import('./features/cards/cards.module').then(m => m.CardsModule) },
  { path: 'transactions', loadChildren: () => import('./features/transactions/transactions.module').then(m => m.TransactionsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
