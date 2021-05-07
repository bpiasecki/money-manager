import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { environment } from '@environment/environment';
import { AccountsModule } from '@features/accounts/accounts.module';
import { LoginComponent } from '@features/auth/login/login.component';
import { RegisterComponent } from '@features/auth/register/register.component';
import { OverviewModule } from '@features/overview/overview.module';
import { TransactionsModule } from '@features/transactions/transactions.module';
import { MaterialModule } from '@shared/material.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CoreModule,
    OverviewModule,
    AccountsModule,
    TransactionsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    NgScrollbarModule.withConfig({
      appearance: 'compact'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
