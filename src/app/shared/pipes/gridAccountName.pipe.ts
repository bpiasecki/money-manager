import { Pipe, PipeTransform } from '@angular/core';
import { WalletItem } from '@core/models/accounts/walletItem.model';

@Pipe({ name: 'gridAccountName' })
export class GridAccountNamePipe implements PipeTransform {
    transform(sourceAccId: number, targetAccId: number, accounts: WalletItem[]): string {
        const sourceAccountName = accounts.find(item => item.id == sourceAccId)?.name;
        const targetAccountName = accounts.find(item => item.id == targetAccId)?.name;

        if (sourceAccountName && targetAccountName)
            return `${sourceAccountName} -> ${targetAccountName}`;
        else if (sourceAccountName)
            return sourceAccountName;
        else if (targetAccountName)
            return targetAccountName
        else
            return "";
    }
}