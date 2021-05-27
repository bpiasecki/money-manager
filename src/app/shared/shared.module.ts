import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { AccountTypePipe } from './pipes/accountType.pipe';
import { GridAccountNamePipe } from './pipes/gridAccountName.pipe';
import { SumValuePipe } from './pipes/sumValue.pipe';

@NgModule({
    declarations: [AccountTypePipe, SumValuePipe, GridAccountNamePipe],
    exports: [
        AccountTypePipe,
        SumValuePipe,
        GridAccountNamePipe,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ],
})
export class SharedModule { }