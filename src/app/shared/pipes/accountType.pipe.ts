import { Pipe, PipeTransform } from '@angular/core';
import { WalletItemTypesList } from '@core/models/accounts/walletItemType.model';

@Pipe({ name: 'accountType' })
export class AccountTypePipe implements PipeTransform {
    private walletItemTypesList = WalletItemTypesList;

    transform(value: string | number | undefined): string {
        return this.walletItemTypesList.find(item => item.type == value)?.name ?? "";
    }
}