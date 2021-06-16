import { Injectable } from '@angular/core';
import { FilterType, TransactionFilterItem } from '@core/models/transactions/transactionFilterItem.model';
import { TransactionTypes } from '@core/models/transactions/transactionType.model';

@Injectable()
export class TransactionFilterService {

    private readonly transactionFilters = [
        new TransactionFilterItem('Typ', FilterType.TransactionType, TransactionTypes),
        new TransactionFilterItem('Data', FilterType.Date),
        new TransactionFilterItem('Nazwa', FilterType.Name),
        new TransactionFilterItem('Konto', FilterType.Account),
        new TransactionFilterItem('Kategoria', FilterType.Category),
        new TransactionFilterItem('Kwota', FilterType.TransactionValue),
    ]

    private _filters: TransactionFilterItem[];
    set filters(filters: TransactionFilterItem[]) {
        this._filters = filters;
    }

    get filters(): TransactionFilterItem[] {
        return [...this._filters ?? this.transactionFilters];
    }
}