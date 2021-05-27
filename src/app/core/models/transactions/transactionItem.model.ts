import { WalletItem } from "../accounts/walletItem.model";
import { TransactionType } from "./transactionType.model";

export class TransactionItem {
    name: string;
    value: number;
    transactionDate: Date | string;
    description?: string;
    type: TransactionType = TransactionType.Expense;
    sourceAccount?: WalletItem;
    targetAccount?: WalletItem;
    category: string;
    warrantyMonthNumber?: number;
}
