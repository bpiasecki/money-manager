import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryPickerComponent } from './custom-components/category-picker/category-picker.component';
import { RemoveConfirmDialogComponent } from './custom-components/remove-confirm-dialog/remove-confirm-dialog.component';
import { MaterialModule } from './material.module';
import { AccountNameWithBalancePipe } from './pipes/accountNameWithBalance.pipe';
import { AccountTypePipe } from './pipes/accountType.pipe';
import { GridAccountNamePipe } from './pipes/gridAccountName.pipe';
import { SumValuePipe } from './pipes/sumValue.pipe';

@NgModule({
    declarations: [
        AccountTypePipe,
        SumValuePipe,
        GridAccountNamePipe,
        AccountNameWithBalancePipe,
        CategoryPickerComponent,
        RemoveConfirmDialogComponent
    ],
    imports: [
        MaterialModule,
        CommonModule
    ],
    exports: [
        AccountTypePipe,
        SumValuePipe,
        GridAccountNamePipe,
        AccountNameWithBalancePipe,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        CategoryPickerComponent,
        RemoveConfirmDialogComponent
    ],
})
export class SharedModule { }