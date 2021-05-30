import { Pipe, PipeTransform } from '@angular/core';
import { WalletItem } from '@core/models/accounts/walletItem.model';

@Pipe({ name: 'accountNameWithBalance' })
export class AccountNameWithBalancePipe implements PipeTransform {

    transform(account: WalletItem, balance: string | null): string {
        return `${account.name} (${balance})`;
    }
}