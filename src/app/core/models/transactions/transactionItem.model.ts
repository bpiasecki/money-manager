import { TransactionType } from "./transactionType.model";

export class TransactionItem {
    name: string;
    value: number;
    transactionDate: Date | string;
    description?: string;
    type: TransactionType = TransactionType.Expense;
    sourceAccount?: string;
    targetAccount?: string;
    category: string;
    warrantyMonthNumber?: number;
}
