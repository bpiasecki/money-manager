import { DebtType } from "./debtType.model";
import { WalletItemType } from "./walletItemType.model";

export class WalletItem {
    name: string;
    balance: number;
    type: WalletItemType;
    description: string;
    isDefault: boolean;
    isCalculatedInSummary: boolean = true;
    icon: string;
    color: string = 'rgba(0, 0, 0, 0.35)';
    startDate: Date | string;
    endDate: Date | string;
    targetValue: number;
    targetName: string;
    targetDescription: string;
    debtType: DebtType;
    debtInitialValue: number;
    isSavingTargetSet: boolean;
}