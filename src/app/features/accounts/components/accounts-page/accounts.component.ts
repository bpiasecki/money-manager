import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { DebtType } from '@core/models/accounts/debtType.model';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { AuthService } from '@core/services/auth.service';
import { ShowHideMainPage } from '@shared/animations/showHideMainPage.animation';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  animations: [ShowHideMainPage]
})
export class AccountsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  public DebtTypes = DebtType;

  // items$: Observable<AngularFireAction<DatabaseSnapshot<WalletItem>>[]>;
  items$: Observable<ItemKeyWithData<WalletItem>[]>;
  userId: string | undefined;
  showPage: boolean = true;

  constructor(private router: Router, private authService: AuthService, private db: AngularFireDatabase) {


  }


  ngOnInit(): void {
    this.authService.authState$.subscribe((user) => {
      this.userId = user?.uid;
      this.items$ =
        this.db.list<WalletItem>('accounts/' + this.userId
          // , ref => value ? ref.orderByChild('value').equalTo(value) : ref
        ).snapshotChanges().pipe(map((result) => {
          const data = result.map(item => new ItemKeyWithData(<string>item.key, <WalletItem>item.payload.val()));
          return data;
        }))
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
