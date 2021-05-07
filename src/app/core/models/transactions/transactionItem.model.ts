import { WalletItem } from "../accounts/walletItem.model";
import { TransactionType } from "./transactionType.model";

export class TransactionItem {
    key: string;
    name: string;
    value: number;
    date: Date;
    description: string;
    type: TransactionType;
    source: WalletItem;
    target: WalletItem;
    category: string;
}
