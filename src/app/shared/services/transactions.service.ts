import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseDbService } from '@core/db/baseDb.service';
import { Endpoints } from '@core/db/endpoints.enum';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';

@Injectable()
export class TransactionsService extends BaseDbService<TransactionItem> {

    constructor(http: HttpClient) {
        super(Endpoints.Transactions, http);
    }

}