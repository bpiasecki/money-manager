import { Injectable } from '@angular/core';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';
import { AccountsService } from '@shared/services/accounts.service';
import { TransactionsService } from '@shared/services/transactions.service';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DbService {

    private transactionsSource = new ReplaySubject<ItemKeyWithData<TransactionItem>[]>()
    public $transactions = this.transactionsSource.asObservable();

    private accountsSource = new ReplaySubject<ItemKeyWithData<WalletItem>[]>()
    public $accounts = this.accountsSource.asObservable();


    constructor(private transactionsService: TransactionsService, private accountsService: AccountsService) {
        this.transactionsService.getItems().subscribe((result) => this.transactionsSource.next(result));
        this.accountsService.getItems().subscribe((result) => this.accountsSource.next(result));
    }
}