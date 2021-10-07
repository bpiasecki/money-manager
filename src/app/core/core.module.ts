import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { DbService } from './db/db.service';

@NgModule({
    declarations: [],
    imports: [HttpClientModule],
    exports: [],
    providers: [AuthService, DbService, AuthGuard, HttpClient],
})
export class CoreModule { }