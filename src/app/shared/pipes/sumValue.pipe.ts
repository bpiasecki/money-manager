import { Pipe, PipeTransform } from '@angular/core';
import { DebtType } from '@core/models/accounts/debtType.model';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { WalletItemType } from '@core/models/accounts/walletItemType.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';

@Pipe({ name: 'sumValue' })
export class SumValuePipe implements PipeTransform {
    transform(values: ItemKeyWithData<WalletItem>[]): number {
        return values
            .filter(item => item.data.isCalculatedInSummary)
            .map(item => {
                if (item.data.type == WalletItemType.Debt && item.data.debtType == DebtType.BorrowedFromSomeone)
                    return item.data.balance * -1;
                else
                    return item.data.balance;
            }).reduce((sum, val) => sum += val, 0);
    }
}