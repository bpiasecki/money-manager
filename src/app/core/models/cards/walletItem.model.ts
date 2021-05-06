import { WalletItemType } from "./walletItemType.model";

export class WalletItem {
    name: string;
    balance: number;
    type: WalletItemType;
    description: string;
    isDefault: boolean;
    isCalculatedInSummary: boolean;
    icon: string;
    color: string;
    startDate: Date;
    endDate: Date;
    targetValue: number;
    targetName: string;
    targetDescription: string;
}