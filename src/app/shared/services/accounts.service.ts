import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BaseDbService } from '@core/db/baseDb.service';
import { Endpoints } from '@core/db/endpoints.enum';
import { WalletItem } from '@core/models/accounts/walletItem.model';

@Injectable()
export class AccountsService extends BaseDbService<WalletItem> {

    constructor(protected db: AngularFireDatabase, http: HttpClient) {
        super(Endpoints.Accounts, db, http);
    }

}