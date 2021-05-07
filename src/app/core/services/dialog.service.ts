import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class DialogService<T> {

    dialogRef: MatDialogRef<T>;
    isPanelOpened: boolean;

    constructor(private baseService: BaseService, private dialog: MatDialog) {
        this.baseService.$isHandset.subscribe((result) => {
            if (this.dialogRef) {
                result === true
                    ? this.dialogRef.removePanelClass('modal-center-page').addPanelClass('modal-center-body')
                    : this.dialogRef.addPanelClass('modal-center-page').removePanelClass('modal-center-body')
            }
            this.isPanelOpened = result;
        });

    }

    open(component: ComponentType<T>): MatDialogRef<T> {
        // this.dialogRef = this.dialog.open(component, { panelClass: `${this.isPanelOpened ? 'modal-center-body' : 'modal-center-page'}`, });
        return this.dialogRef = this.dialog.open(component, { panelClass: `${this.isPanelOpened ? 'modal-center-body' : 'modal-center-page'}`, });
    }
}