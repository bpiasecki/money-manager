import { Pipe, PipeTransform } from '@angular/core';
import { DebtType } from '@core/models/accounts/debtType.model';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { WalletItemType } from '@core/models/accounts/walletItemType.model';

@Pipe({ name: 'sumValue' })
export class SumValuePipe implements PipeTransform {
    transform(values: WalletItem[]): number {
        return values
            .filter(item => item.isCalculatedInSummary)
            .map(item => {
                if (item.type == WalletItemType.Debt && item.debtType == DebtType.BorrowedFromSomeone)
                    return item.balance * -1;
                else
                    return item.balance;
            }).reduce((sum, val) => sum += val, 0);
    }
}