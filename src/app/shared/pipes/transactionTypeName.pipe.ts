import { Pipe, PipeTransform } from '@angular/core';
import { TransactionType, TransactionTypes, TransactionTypeViewItem } from '@core/models/transactions/transactionType.model';

@Pipe({ name: 'transactionTypeName' })
export class TransactionTypeNamePipe implements PipeTransform {

    private readonly transactionTypes: TransactionTypeViewItem[] = TransactionTypes;

    transform(type: TransactionType): string {
        return this.transactionTypes.find(item => item.type == type)?.name ?? "";
    }
}