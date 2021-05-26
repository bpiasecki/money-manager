import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [],
    providers: [AuthService],
})
export class CoreModule { }