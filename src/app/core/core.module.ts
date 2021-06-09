import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { DbService } from './db/db.service';

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [AuthService, DbService, AuthGuard],
})
export class CoreModule { }