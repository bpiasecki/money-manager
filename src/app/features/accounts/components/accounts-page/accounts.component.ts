import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DebtType } from '@core/models/accounts/debtType.model';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { TransactionType } from '@core/models/transactions/transactionType.model';
import { DbService } from '@core/services/db.service';
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

  constructor(private router: Router, private dbService: DbService, private accountsService: AccountsService) { }


  ngOnInit(): void {
    this.items$ = this.dbService.$accounts;
  }

  public removeAccount(key: string): void {
    this.accountsService.removeItem(key);
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

  public addTransaction(key: string) {
    this.showPage = false;
    setTimeout(() => {
      this.router.navigate(['/transactionAddEdit/', {account: key}])
    }, 200);
  }

  public addTransferTransaction() {
    this.showPage = false;
    setTimeout(() => {
      this.router.navigate(['/transactionAddEdit/', {transactionType: TransactionType.Transfer}])
    }, 200);
  }

}
