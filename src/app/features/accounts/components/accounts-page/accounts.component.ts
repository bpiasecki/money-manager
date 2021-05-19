import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DebtType } from '@core/models/accounts/debtType.model';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { AccountsService } from '@features/accounts/services/accounts.service';
import { ShowHideMainPage } from '@shared/animations/showHideMainPage.animation';
import { Observable } from 'rxjs';

@Component({
  selector: 'mm-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  animations: [ShowHideMainPage]
})
export class AccountsComponent implements OnInit {

  public DebtTypes = DebtType;

  items$: Observable<ItemKeyWithData<WalletItem>[]>;
  userId: string | undefined;
  showPage: boolean = true;

  constructor(private router: Router, private accountsService: AccountsService) { }


  ngOnInit(): void {
    this.items$ = this.accountsService.getAccountsList();
  }

  public removeAccount(key: string): void {
    this.accountsService.removeAccount(key);
  }

  public addAccount() {
    this.showPage = false;
    setTimeout(() => {
      this.router.navigate(['/accountAddEdit'])
    }, 200);
  }

  public editAccount(key: string) {
    this.showPage = false;
    setTimeout(() => {
      this.router.navigate(['/accountAddEdit/' + key])
    }, 200);
  }

}
