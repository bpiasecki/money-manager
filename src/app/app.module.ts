import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import localePl from '@angular/common/locales/pl';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { environment } from '@environment/environment';
import { AccountAddEditComponent } from '@features/account-add-edit/account-add-edit.component';
import { AccountsComponent } from '@features/accounts-page/accounts.component';
import { LoginComponent } from '@features/login/login.component';
import { RegisterComponent } from '@features/register-user/register.component';
import { TransactionAddEditComponent } from '@features/transaction-add-edit/transaction-add-edit.component';
import { TransactionFilterService } from '@features/transaction-filter/transaction-filter.service';
import { TransactionsComponent } from '@features/transactions-page/transactions.component';
import { MaterialModule } from '@shared/material.module';
import { AccountsService } from '@shared/services/accounts.service';
import { CategoriesService } from '@shared/services/categories.service';
import { TransactionsService } from '@shared/services/transactions.service';
import { UserDataService } from '@shared/services/userData.service';
import { SharedModule } from '@shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionFilterComponent } from './features/transaction-filter/transaction-filter.component';
import { TokenInterceptor } from './token.interceptor';

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TransactionsComponent,
    TransactionAddEditComponent,
    AccountsComponent,
    AccountAddEditComponent,
    TransactionFilterComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule,
    MaterialModule,
    NgxDatatableModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgScrollbarModule.withConfig({ appearance: 'compact' }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'PLN' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AccountsService,
    TransactionsService,
    CategoriesService,
    UserDataService,
    TransactionFilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
