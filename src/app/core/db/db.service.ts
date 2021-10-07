import { Injectable } from '@angular/core';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { CategoryItem } from '@core/models/categories/categoryItem.model';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';
import { AccountsService } from '@shared/services/accounts.service';
import { CategoriesService } from '@shared/services/categories.service';
import { TransactionsService } from '@shared/services/transactions.service';
import { combineLatest, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class DbService {

    private transactionsSource = new ReplaySubject<TransactionItem[]>(1)
    public $transactions = this.transactionsSource.asObservable();

    private accountsSource = new ReplaySubject<WalletItem[]>(1)
    public $accounts = this.accountsSource.asObservable();

    private categoriesSource = new ReplaySubject<CategoryItem[]>(1)
    public $categories = this.categoriesSource.asObservable();

    private isLoading = new Subject<boolean>();
    public $isLoading = this.isLoading.asObservable();


    constructor(
        private transactionsService: TransactionsService,
        private accountsService: AccountsService,
        private categoriesService: CategoriesService
    ) { this.init() }

    public init() {
        this.setIsLoading(true);
        combineLatest([
            this.transactionsService.getItems(),
            this.accountsService.getItems(),
            this.categoriesService.getItems()
        ]).subscribe(([transactions, accounts, categories]) => {
            this.transactionsSource.next(transactions);
            this.accountsSource.next(accounts);
            this.categoriesSource.next(categories);
            this.setIsLoading(false);
        }, (_err) => {
            this.setIsLoading(false);
        })
    }

    refreshAccounts() {
        return this.accountsService.getItems().pipe(tap(res => { this.accountsSource.next(res) }));
    }

    refreshTransactions() {
        return this.transactionsService.getItems().pipe(tap(res => { this.transactionsSource.next(res) }));
    }

    refreshCategories() {
        return this.categoriesService.getItems().pipe(tap(res => { this.categoriesSource.next(res) }));
    }

    public setIsLoading(value: boolean): void {
        this.isLoading.next(value);
    }

    public getTransaction(id: undefined | number): Observable<TransactionItem> {
        return this.$transactions.pipe(
            map(transactions => transactions.find(item => item.id === id) ?? new TransactionItem())
        )
    }

    public getAccount(id: undefined | number): Observable<WalletItem> {
        return this.$accounts.pipe(
            map(accounts => accounts.find(item => item.id === id) ?? new WalletItem())
        )
    }

    public getCategory(id: number): Observable<CategoryItem> {
        return this.$categories.pipe(
            map(categories => {
                let foundItem = categories.find(item => item.id === id);
                if (!foundItem) {
                    categories.forEach(parent => {
                        const foundChild = parent.children.find(item => item.id === id);
                        if (foundChild) {
                            foundItem = foundChild
                            return;
                        }
                    })

                }
                if (!foundItem)
                    foundItem = new CategoryItem(-1, '');

                return foundItem;
            })
        )
    }

    public getCategoryNameWithParent(id: number | undefined): Observable<string | null> {
        if (id === undefined)
            return of(null);
        else {
            return this.getCategory(id).pipe(switchMap((categoryItem) => {
                if (categoryItem?.parentId) {
                    return this.getCategory(categoryItem.parentId).pipe(switchMap((parentItem) => {
                        const categoryWithParentName = `${parentItem ? parentItem.name + ' - ' : ''}${categoryItem.name}`;
                        return of(categoryWithParentName);
                    }))
                } else {
                    const categoryName = categoryItem?.name ?? null;
                    return of(categoryName);
                }
            }));
        }
    }

}