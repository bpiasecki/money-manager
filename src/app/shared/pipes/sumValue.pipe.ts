import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireAction } from '@angular/fire/database';
import { DatabaseSnapshot } from '@angular/fire/database/interfaces';
import { DebtType } from '@core/models/accounts/debtType.model';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { WalletItemType } from '@core/models/accounts/walletItemType.model';

@Pipe({ name: 'sumValue' })
export class SumValuePipe implements PipeTransform {
    transform(values: AngularFireAction<DatabaseSnapshot<WalletItem>>[]): number {
        return values
            .filter(item => item.payload.val()?.isCalculatedInSummary)
            .map(item => {
                const data = <WalletItem>item.payload.val();
                if (data.type == WalletItemType.Debt && data.debtType == DebtType.BorrowedFromSomeone)
                    return data.balance * -1;
                else
                    return data.balance;
            }).reduce((sum, val) => sum += val, 0);
    }
}