import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class DialogService {

    private dialogRef: MatDialogRef<any>;
    private isPanelOpened: boolean;
    private resizeSubscription = new Subscription();

    constructor(private baseService: BaseService, private dialog: MatDialog) { }

    private addViewSizeSubscription() {
        this.resizeSubscription = this.baseService.$isHandset.subscribe((result) => {
            if (this.dialogRef) {
                result === true
                    ? this.dialogRef.removePanelClass('modal-center-page').addPanelClass('modal-center-body')
                    : this.dialogRef.addPanelClass('modal-center-page').removePanelClass('modal-center-body')
            }
            this.isPanelOpened = result;
        });
    }

    public open(component: ComponentType<any>) {
        this.addViewSizeSubscription();
        this.dialogRef = this.dialog.open(component, { panelClass: `${this.isPanelOpened ? 'modal-center-body' : 'modal-center-page'}` });
    }

    public close() {
        if (this.dialogRef) {
            this.dialogRef.close();
            this.resizeSubscription.unsubscribe();
        }
    }
}