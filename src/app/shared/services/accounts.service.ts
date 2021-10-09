import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseDbService } from '@core/db/baseDb.service';
import { Endpoints } from '@core/db/endpoints.enum';
import { WalletItem } from '@core/models/accounts/walletItem.model';

@Injectable()
export class AccountsService extends BaseDbService<WalletItem> {

    constructor(http: HttpClient) {
        super(Endpoints.Accounts, http);
    }

}