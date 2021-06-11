export enum TransactionType {
    Income,
    Expense,
    Transfer
}

export class TransactionTypeViewItem {
    constructor(
        public type: TransactionType,
        public color: string,
        public name: string,
        public icon: string
    ) { }
}

export const TransactionTypes = [
    new TransactionTypeViewItem(TransactionType.Income, 'springgreen', 'PRZYCHÓD', 'add'),
    new TransactionTypeViewItem(TransactionType.Expense, 'red', 'WYDATEK', 'remove'),
    new TransactionTypeViewItem(TransactionType.Transfer, 'yellow', 'PRZELEW', 'sync_alt')
];