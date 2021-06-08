import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Endpoints } from '@core/db/endpoints.enum';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { AuthService } from '@core/services/auth.service';
import { BaseDbService } from '@core/services/baseDb.service';
import { Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable()
export class AccountsService extends BaseDbService<WalletItem> {

    constructor(authService: AuthService, protected db: AngularFireDatabase) {
        super(Endpoints.Accounts, authService, db);
    }

    public removeExistingDefaultAccountFlag(): Observable<void> {
        return this.getItems().pipe(
            first(),
            map(accounts => accounts.find(account => account.data.isDefault === true)),
            switchMap((item) => {
                if (item) {
                    item.data.isDefault = false;
                    return this.updateItem(item.key, item.data);
                } else
                    return of(void 0);
            })
        )
    }

}