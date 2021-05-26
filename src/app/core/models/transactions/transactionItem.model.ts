import { WalletItem } from "../accounts/walletItem.model";
import { TransactionType } from "./transactionType.model";

export class TransactionItem {
    name: string;
    value: number;
    date: Date;
    description: string;
    type: TransactionType;
    sourceAccount: WalletItem;
    targetAccount: WalletItem;
    category: string;
    warrantyMonthNumber: number;

    constructor(name: string) {
        this.name = name;
    }
}
