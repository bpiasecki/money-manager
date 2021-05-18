import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAction, AngularFireDatabase } from '@angular/fire/database';
import { DatabaseSnapshot } from '@angular/fire/database/interfaces';
import { Router } from '@angular/router';
import { DebtType } from '@core/models/accounts/debtType.model';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { AuthService } from '@core/services/auth.service';
import { BaseService } from '@core/services/base.service';
import { DialogService } from '@core/services/dialog.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'mm-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  animations: [trigger('enterIn', [
    transition(':enter', [
      style({ transform: 'scale(0.7)', opacity: 0 }),
      animate('.2s ease-out', style({ transform: 'scale(1)', opacity: 0.9 }))
    ]),
    transition(':leave', [
      style({ transform: 'scale(1)', opacity: 0.9 }),
      animate('.2s ease-out', style({ transform: 'scale(0.7)', opacity: 0 }))
    ])
  ])]
})
export class AccountsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  public DebtTypes = DebtType;

  items$: Observable<AngularFireAction<DatabaseSnapshot<WalletItem>>[]>;
  userId: string | undefined;
  showPage: boolean = true;

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
    this.showPage = false;
    setTimeout(() => {
      this.router.navigate(['/accountAdd'])
    }, 200);
  }

  public editAccount(key: string | null) {
    this.showPage = false;
    setTimeout(() => {
      this.router.navigate(['/accountAdd/' + key])
    }, 200);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
