import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CategoryPickerComponent } from './custom-components/category-picker/category-picker.component';
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
        CategoryPickerComponent
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
        NgxDatatableModule
    ],
})
export class SharedModule { }