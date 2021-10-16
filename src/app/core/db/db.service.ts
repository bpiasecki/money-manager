import { Injectable } from '@angular/core';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { CategoryItem } from '@core/models/categories/categoryItem.model';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';
import { AccountsService } from '@shared/services/accounts.service';
import { CategoriesService } from '@shared/services/categories.service';
import { TransactionsService } from '@shared/services/transactions.service';
import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class DbService {

    private transactionsSource = new ReplaySubject<TransactionItem[]>(1)
    public $transactions = this.transactionsSource.asObservable();

    private accountsSource = new ReplaySubject<WalletItem[]>(1)
    public $accounts = this.accountsSource.asObservable();

    private categoriesSource = new ReplaySubject<CategoryItem[]>(1)
    public $categories = this.categoriesSource.asObservable();

    private isLoading = new ReplaySubject<boolean>(1);
    public $isLoading = this.isLoading.asObservable();


    constructor(
        private transactionsService: TransactionsService,
        private accountsService: AccountsService,
        private categoriesService: CategoriesService
    ) { this.init() }

    public init() {
        if (localStorage.getItem('token')) {
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
        } else {
            this.setIsLoading(false);
        }
    }

    refreshAccounts() {
        return this.accountsService.getItems().pipe(tap(res => { this.accountsSource.next(res) }));
    }

    refreshTransactions(item: TransactionItem, removeItem: boolean = false) {
        // const published = this.$transactions.pipe(
        //     publish((res) => {

        //     }),
        // )
        // const obs = new ReplaySubject(1);

        // const source = new Observable((observer) => {
        //     observer.next(1);

        //     setTimeout(() => observer.next(2), 1000);
        //     setTimeout(() => {
        //       observer.next(3);
        //       observer.complete();
        //     }, 2000);

        //     return () => {
        //       console.log('Disposed');
        //     };
        //   });



        // this.$transactions.pipe(tap(transactions => {
        //     const foundIndex = transactions.findIndex(transaction => transaction.id === item.id);
        //     if (foundIndex < 0)
        //         transactions.push(item);
        //     else if (removeItem)
        //         transactions.splice(foundIndex, 1);
        //     else
        //         transactions[foundIndex] = item;

        //     obs.next(transactions);
        //     obs.complete()
        // })).subscribe()
        const obs = new Observable((res) =>

            this.$transactions.pipe(take(1)).subscribe(transactions => {
                const foundIndex = transactions.findIndex(transaction => transaction.id === item.id);
                if (foundIndex < 0)
                    transactions.push(item);
                else if (removeItem)
                    transactions.splice(foundIndex, 1);
                else
                    transactions[foundIndex] = item;

                res.next()
                res.complete()
                // this.transactionsSource.next(transactions);
                // obs.complete();
            })
        )

        return obs
        // return obs.asObservable();
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