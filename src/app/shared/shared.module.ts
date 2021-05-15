import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

@NgModule({
    exports: [
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ],
})
export class SharedModule { }