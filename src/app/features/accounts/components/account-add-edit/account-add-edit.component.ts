import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { WalletItemTypesList } from '@core/models/accounts/walletItemType.model';
import { AuthService } from '@core/services/auth.service';
import { DialogService } from '@core/services/dialog.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-account-add-edit',
  templateUrl: './account-add-edit.component.html',
  styleUrls: ['./account-add-edit.component.scss']
})
export class AccountAddEditComponent implements OnInit {

  public walletItemTypes = WalletItemTypesList;

  public colors = [
    { color: 'rgba(0, 0, 0, 0.35)', checked: false },
    { color: 'rgba(255,0,0,0.35)', checked: false },
    { color: 'rgba(110,0,110,.35)', checked: false },
    { color: 'rgba(0,125,0,0.35)', checked: false },
    { color: 'rgba(0,0,125,0.35)', checked: false },
    { color: 'rgba(110,110,0,0.35)', checked: false }
  ]

  private userId: string | undefined;
  private dbItem: AngularFireObject<WalletItem>;
  public itemKey: string | undefined;
  public $account: Observable<WalletItem>;

  constructor(private location: Location, private route: ActivatedRoute, private db: AngularFireDatabase, private authService: AuthService, private dialogService: DialogService) {
    this.authService.user.then((user) => {
      this.userId = user?.uid
      this.route.params.subscribe((params) => {
        this.itemKey = params['id'];
        this.dbItem = this.db.object<WalletItem>(`accounts/${this.userId}/${this.itemKey}`);
        this.$account = this.dbItem.valueChanges().pipe(map(res => res ?? new WalletItem()));
      })
    });

  }

  ngOnInit(): void {
  }

  public addEditAccount(account: WalletItem): void {
    if (this.itemKey)
      this.dbItem.update(account).then(() => this.closePanel());
    else
      this.db.list('accounts/' + this.userId).push(account).then(() => this.closePanel())
  }

  public setColor(account: WalletItem, color: string) {
    account.color = color;
  }

  public closePanel(): void {
    this.location.back()
  }
}
