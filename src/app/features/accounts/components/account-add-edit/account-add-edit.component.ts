import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { DebtType } from '@core/models/accounts/debtType.model';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { WalletItemType, WalletItemTypesList } from '@core/models/accounts/walletItemType.model';
import { AuthService } from '@core/services/auth.service';
import { DialogService } from '@core/services/dialog.service';
import { PreventInitialChildAnimations } from '@shared/animations/preventInitialChildAnimations.animation';
import { ShowHideButtonAnimation } from '@shared/animations/showHideButton.animation';
import { ShowHideCheckboxAnimation } from '@shared/animations/showHideCheckbox.animation';
import { ShowHideEditPage } from '@shared/animations/showHideEditPage.animation';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'mm-account-add-edit',
  templateUrl: './account-add-edit.component.html',
  styleUrls: ['./account-add-edit.component.scss'],
  animations: [
    ShowHideButtonAnimation,
    ShowHideCheckboxAnimation,
    PreventInitialChildAnimations,
    ShowHideEditPage
  ]
})
export class AccountAddEditComponent implements OnInit {

  public walletItemTypesList = WalletItemTypesList;

  public AccountTypes = WalletItemType;
  public DebtTypes = DebtType;

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
  public dataLoaded: boolean = false;
  public showPage: boolean = true;

  constructor(private location: Location, private route: ActivatedRoute, private db: AngularFireDatabase, private authService: AuthService, private dialogService: DialogService) {
    this.authService.user.then((user) => {
      this.userId = user?.uid
      this.route.params.subscribe((params) => {
        this.itemKey = params['id'];
        this.dbItem = this.db.object<WalletItem>(`accounts/${this.userId}/${this.itemKey}`);
        this.$account = this.dbItem.valueChanges().pipe(tap(() => this.dataLoaded = true), map(res => res ?? new WalletItem()));
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
    this.showPage = false;
    setTimeout(() => {
      this.location.back()
    }, 200);

  }
}
