import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Endpoints } from '@core/db/endpoints.enum';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { AuthService } from '@core/services/auth.service';
import { BaseDbService } from '@core/services/baseDb.service';

@Injectable()
export class AccountsService extends BaseDbService<WalletItem> {

    constructor(authService: AuthService, db: AngularFireDatabase) {
        super(Endpoints.Accounts, new WalletItem(), authService, db);
    }

}