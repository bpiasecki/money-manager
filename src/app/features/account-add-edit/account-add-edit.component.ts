import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '@core/db/db.service';
import { DebtType } from '@core/models/accounts/debtType.model';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { WalletItemType, WalletItemTypesList } from '@core/models/accounts/walletItemType.model';
import { PreventInitialChildAnimations } from '@shared/animations/preventInitialChildAnimations.animation';
import { ShowHideButtonAnimation } from '@shared/animations/showHideButton.animation';
import { ShowHideCheckboxAnimation } from '@shared/animations/showHideCheckbox.animation';
import { ShowHideEditPage } from '@shared/animations/showHideEditPage.animation';
import { ShowHideFormFieldAnimation } from '@shared/animations/showHideFormField.animation';
import { AccountsService } from '@shared/services/accounts.service';
import { Observable } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';

@Component({
  selector: 'mm-account-add-edit',
  templateUrl: './account-add-edit.component.html',
  styleUrls: ['./account-add-edit.component.scss'],
  animations: [
    ShowHideButtonAnimation,
    ShowHideCheckboxAnimation,
    PreventInitialChildAnimations,
    ShowHideEditPage,
    ShowHideFormFieldAnimation
  ]
})
export class AccountAddEditComponent implements OnInit {

  public walletItemTypesList = WalletItemTypesList;

  public AccountTypes = WalletItemType;
  public DebtTypes = DebtType;

  public readonly colors = [
    { color: 'rgba(0, 0, 0, 0.35)', checked: false },
    { color: 'rgba(255,0,0,0.35)', checked: false },
    { color: 'rgba(110,0,110,.35)', checked: false },
    { color: 'rgba(0,125,0,0.35)', checked: false },
    { color: 'rgba(0,0,125,0.35)', checked: false },
    { color: 'rgba(110,110,0,0.35)', checked: false }
  ]

  public itemKey: number | undefined;
  public $account: Observable<WalletItem>;
  public showPage: boolean = true;

  constructor(private accountsService: AccountsService, private dbService: DbService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.itemKey = +params['id'];
      this.$account = this.dbService.getAccount(this.itemKey);
    })
  }

  public addEditAccount(account: WalletItem): void {
    const actionObservable = this.itemKey ? this.accountsService.updateItem(this.itemKey, account) : this.accountsService.addNewItem(account);
    actionObservable.pipe(switchMapTo(this.dbService.refreshAccounts())).subscribe(() => this.closePanel());
  }

  public closePanel(): void {
    this.showPage = false;
    setTimeout(() => {
      this.location.back()
    }, 200);
  }

}
