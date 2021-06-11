import { Pipe, PipeTransform } from '@angular/core';
import { TransactionType, TransactionTypes, TransactionTypeViewItem } from '@core/models/transactions/transactionType.model';

@Pipe({ name: 'transactionTypeColor' })
export class TransactionTypeColorPipe implements PipeTransform {

    private readonly transactionTypes: TransactionTypeViewItem[] = TransactionTypes;

    transform(type: TransactionType): string {
        return this.transactionTypes.find(item => item.type == type)?.color ?? 'black';
    }
}