import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { BaseService } from './services/base.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [],
    providers: [AuthService, BaseService],
})
export class CoreModule { }