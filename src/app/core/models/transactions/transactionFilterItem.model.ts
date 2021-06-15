import { TransactionItem } from "./transactionItem.model";

export class TransactionFilterItem {
    filterFn: ((item: TransactionItem, firstValue: any, secondValue?: any) => boolean) | undefined;
    visibleName?: string;
    value?: any;
    addictionalValue?: any;

    constructor(
        public name: string,
        public type: FilterType,
        public listItems?: any[]
    ) { }
}

export enum FilterType {
    TransactionType,
    Date,
    Name,
    Account,
    Category,
    TransactionValue
}