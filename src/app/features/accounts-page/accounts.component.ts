import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '@core/db/db.service';
import { DebtType } from '@core/models/accounts/debtType.model';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { TransactionType } from '@core/models/transactions/transactionType.model';
import { ShowHideMainPage } from '@shared/animations/showHideMainPage.animation';
import { RemoveConfirmDialogComponent } from '@shared/custom-components/remove-confirm-dialog/remove-confirm-dialog.component';
import { AccountsService } from '@shared/services/accounts.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

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

  constructor(private router: Router, private dbService: DbService, private accountsService: AccountsService, private dialog: NgDialogAnimationService) { }


  ngOnInit(): void {
    this.items$ = this.dbService.$accounts;
  }

  public removeAccount(key: string, accountName: string): void {
    this.dialog.open(RemoveConfirmDialogComponent, {
      data: `Czy na pewno chcesz usunąć<br><u>${accountName}</u> z listy kont?`
    }).afterClosed()
      .pipe(filter(confirmed => confirmed === true))
      .subscribe(() => this.accountsService.removeItem(key));
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
      this.router.navigate(['/transactionAddEdit/', { account: key }])
    }, 200);
  }

  public addTransferTransaction() {
    this.showPage = false;
    setTimeout(() => {
      this.router.navigate(['/transactionAddEdit/', { transactionType: TransactionType.Transfer }])
    }, 200);
  }

}
