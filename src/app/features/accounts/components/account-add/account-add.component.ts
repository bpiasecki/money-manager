import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { WalletItemTypesList } from '@core/models/accounts/walletItemType.model';
import { AuthService } from '@core/services/auth.service';
import { DialogService } from '@core/services/dialog.service';

@Component({
  selector: 'mm-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent implements OnInit {

  public account = new WalletItem();
  public walletItemTypes = WalletItemTypesList;

  public walletTypes = []
  userId: string | undefined;
  
  constructor(private db: AngularFireDatabase, private authService: AuthService, private dialogService: DialogService) {
    this.authService.user.then((user) => this.userId = user?.uid);}

  ngOnInit(): void {
  }

  public addAccount(): void {
    this.db.list('accounts/' + this.userId).push(this.account).then(() => this.closePanel())
  }

  public closePanel(): void {
    this.dialogService.close();
  }
}
