import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireAction } from '@angular/fire/database';
import { DatabaseSnapshot } from '@angular/fire/database/interfaces';
import { WalletItem } from '@core/models/accounts/walletItem.model';

@Pipe({ name: 'sumValue' })
export class SumValuePipe implements PipeTransform {
    transform(values: AngularFireAction<DatabaseSnapshot<WalletItem>>[]): number {
        return values.map(item => (<WalletItem>item.payload.val()).balance ?? 0).reduce((sum, val) => sum += val, 0);
    }
}