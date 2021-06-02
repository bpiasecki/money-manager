import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DbService } from './services/db.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [],
    providers: [AuthService, DbService],
})
export class CoreModule { }