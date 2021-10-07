import { WalletItem } from "../accounts/walletItem.model";
import { TransactionType } from "./transactionType.model";

export class TransactionItem {
    id: number;
    name: string;
    value: number;
    transactionDate: Date;
    description?: string;
    type: TransactionType = TransactionType.Expense;
    sourceAccountId?: number;
    targetAccountId?: number;
    categoryId: number;
    warrantyMonthNumber?: number;
    sourceAccount?: WalletItem;
    targetAccount?: WalletItem;
}
