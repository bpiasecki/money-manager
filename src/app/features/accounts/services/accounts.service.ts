import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class AccountsService {
    private readonly accountsEndpoint = 'accounts/';

    private userId: string | undefined;

    constructor(private db: AngularFireDatabase, private authService: AuthService) { }

    public getAccountsList(): Observable<ItemKeyWithData<WalletItem>[]> {
        if (!this.userId) {
            return this.authService.getUserId().pipe(switchMap((userId) => {
                this.userId = userId;
                return this.getAccountsFromDb();
            }))
        } else
            return this.getAccountsFromDb();
    }

    private getAccountsFromDb(): Observable<ItemKeyWithData<WalletItem>[]> {
        return this.getDbList().snapshotChanges().pipe(map((result) => {
            return result.map(item => new ItemKeyWithData(<string>item.key, <WalletItem>item.payload.val()));
        }))
    }

    public getAccount(key: string | undefined): Observable<WalletItem> {
        return this.getDbItem(key).valueChanges().pipe(map(res => {
            return res ?? new WalletItem()
        }));
    }

    public addNewAccount(account: WalletItem): firebase.default.database.ThenableReference {
        return this.getDbList().push(account);
    }

    public removeAccount(key: string): Promise<void> {
        return this.getDbItem(key).remove();
    }

    public updateAccount(key: string, updatedItem: WalletItem): Promise<void> {
        return this.getDbItem(key).update(updatedItem);
    }

    public getDbItem(itemKey: string | undefined): AngularFireObject<WalletItem> {
        return this.db.object<WalletItem>(`${this.accountsEndpoint}${this.userId}/${itemKey}`);
    }

    public getDbList(): AngularFireList<WalletItem> {
        return this.db.list<WalletItem>(`${this.accountsEndpoint}${this.userId}`);
    }

}