import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAction, AngularFireDatabase } from '@angular/fire/database';
import { DatabaseSnapshot } from '@angular/fire/database/interfaces';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { AuthService } from '@core/services/auth.service';
import { BaseService } from '@core/services/base.service';
import { DialogService } from '@core/services/dialog.service';
import { Observable, Subscription } from 'rxjs';
import { AccountAddComponent } from '../account-add/account-add.component';

@Component({
  selector: 'mm-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  
  items$: Observable<AngularFireAction<DatabaseSnapshot<WalletItem>>[]>;
  userId: string | undefined;

  constructor(private baseService: BaseService, private dialogService: DialogService, private authService: AuthService, private db: AngularFireDatabase) {
    
    this.authService.user.then((user) => {
      this.userId = user?.uid;
      this.items$ = 
      this.db.list<WalletItem>('accounts/' + this.userId
      // , ref => value ? ref.orderByChild('value').equalTo(value) : ref
      ).snapshotChanges()
    });
  }
   

  ngOnInit(): void {
    this.subscriptions.add(this.baseService.$addNewItem.subscribe(() => {
      this.dialogService.open(AccountAddComponent);
    }));
    
  }

  public removeAccount(key: string | null): void {
    if(key)
      this.db.list<WalletItem>('accounts/' + this.userId).remove(key);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
