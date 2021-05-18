import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { AccountTypePipe } from './pipes/accountType.pipe';
import { SumValuePipe } from './pipes/sumValue.pipe';

@NgModule({
    declarations: [AccountTypePipe, SumValuePipe],
    exports: [
        AccountTypePipe,
        SumValuePipe,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ],
})
export class SharedModule { }