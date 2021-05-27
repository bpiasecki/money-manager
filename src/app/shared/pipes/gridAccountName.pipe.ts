import { Pipe, PipeTransform } from '@angular/core';
import { WalletItem } from '@core/models/accounts/walletItem.model';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';

@Pipe({ name: 'gridAccountName' })
export class GridAccountNamePipe implements PipeTransform {
    transform(sourceAccKey: string, targetAccKey: string, accounts: ItemKeyWithData<WalletItem>[]): string {
        const sourceAccountName = accounts.find(item => item.key == sourceAccKey)?.data.name;
        const targetAccountName = accounts.find(item => item.key == targetAccKey)?.data.name;

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