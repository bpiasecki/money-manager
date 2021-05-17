import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAction, AngularFireDatabase } from '@angular/fire/database';
import { DatabaseSnapshot } from '@angular/fire/database/interfaces';
import { Router } from '@angular/router';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { AuthService } from '@core/services/auth.service';
import { BaseService } from '@core/services/base.service';
import { DialogService } from '@core/services/dialog.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'mm-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  items$: Observable<AngularFireAction<DatabaseSnapshot<WalletItem>>[]>;
  userId: string | undefined;

  constructor(private router: Router, private baseService: BaseService, private dialogService: DialogService, private authService: AuthService, private db: AngularFireDatabase) {


  }


  ngOnInit(): void {
    this.authService.authState$.subscribe((user) => {
      this.userId = user?.uid;
      this.items$ =
        this.db.list<WalletItem>('accounts/' + this.userId
          // , ref => value ? ref.orderByChild('value').equalTo(value) : ref
        ).snapshotChanges()
    });
  }

  public removeAccount(key: string | null): void {
    if (key)
      this.db.list<WalletItem>('accounts/' + this.userId).remove(key);
  }

  public addAccount() {
    this.router.navigate(['/accountAdd'])
  }

  public editAccount(key: string | null) {
    this.router.navigate(['/accountAdd/' + key])
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
