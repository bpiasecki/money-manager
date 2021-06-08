import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { CategoryItem, CategoryItemView } from '@core/models/categories/categoryItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';
import { AccountsService } from '@shared/services/accounts.service';
import { CategoriesService } from '@shared/services/categories.service';
import { TransactionsService } from '@shared/services/transactions.service';
import { combineLatest, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class DbService {

    private transactionsSource = new ReplaySubject<ItemKeyWithData<TransactionItem>[]>()
    public $transactions = this.transactionsSource.asObservable();

    private accountsSource = new ReplaySubject<ItemKeyWithData<WalletItem>[]>()
    public $accounts = this.accountsSource.asObservable();

    private categoriesSource = new ReplaySubject<ItemKeyWithData<CategoryItem>[]>()
    public $categories = this.categoriesSource.asObservable();

    private isLoading = new Subject<boolean>();
    public $isLoading = this.isLoading.asObservable();


    constructor(
        private transactionsService: TransactionsService,
        private accountsService: AccountsService,
        private categoriesService: CategoriesService,
        private router: Router
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
        }, (error) => {
            this.setIsLoading(false);
            this.router.navigate(['/login'])
        })
    }

    public setIsLoading(value: boolean): void {
        this.isLoading.next(value);
    }

    public getTransaction(key: string | undefined): Observable<TransactionItem> {
        return this.$transactions.pipe(
            map(transactions => transactions.find(item => item.key === key)?.data ?? new TransactionItem())
        )
    }

    public getAccount(key: string | undefined): Observable<WalletItem> {
        return this.$accounts.pipe(
            map(accounts => accounts.find(item => item.key === key)?.data ?? new WalletItem())
        )
    }

    public getCategory(key: string | undefined): Observable<CategoryItem> {
        return this.$categories.pipe(
            map(categories => categories.find(item => item.key === key)?.data ?? new CategoryItem(''))
        )
    }

    public getGroupedCategories(): Observable<ItemKeyWithData<CategoryItemView>[]> {
        return this.$categories.pipe(map(result => {
            const parents = result.filter(item => !item.data.parent).map(item =>
                new ItemKeyWithData(item.key, <CategoryItemView>item.data)
            );

            parents.forEach(parent =>
                parent.data.children = result.filter(item => item.data.parent == parent.key)
            );

            return parents;
        }))
    }

    public getCategoryNameWithParent(key: string | undefined): Observable<string | null> {
        if (key === undefined)
            return of(null);
        else {
            return this.getCategory(key).pipe(switchMap((categoryItem) => {
                if (categoryItem?.parent) {
                    return this.getCategory(categoryItem.parent).pipe(switchMap((parentItem) => {
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