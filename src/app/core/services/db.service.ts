import { Injectable } from '@angular/core';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { CategoryItem } from '@core/models/categories/categoryItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';
import { AccountsService } from '@shared/services/accounts.service';
import { CategoriesService } from '@shared/services/categories.service';
import { TransactionsService } from '@shared/services/transactions.service';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';

@Injectable()
export class DbService {

    private transactionsSource = new ReplaySubject<ItemKeyWithData<TransactionItem>[]>()
    public $transactions = this.transactionsSource.asObservable();

    private accountsSource = new ReplaySubject<ItemKeyWithData<WalletItem>[]>()
    public $accounts = this.accountsSource.asObservable();

    private categoriesSource = new ReplaySubject<ItemKeyWithData<CategoryItem>[]>()
    public $categories = this.accountsSource.asObservable();

    private isLoading = new BehaviorSubject<boolean>(true);
    public $isLoading = this.isLoading.asObservable();


    constructor(private transactionsService: TransactionsService, private accountsService: AccountsService, private categoriesService: CategoriesService) {
        combineLatest([
            this.transactionsService.getItems(),
            this.accountsService.getItems(),
            this.categoriesService.getItems()
        ]).subscribe(([transactions, accounts, categories]) => {
            this.transactionsSource.next(transactions);
            this.accountsSource.next(accounts);
            this.categoriesSource.next(categories);
            this.isLoading.next(false);
        })
    }
}