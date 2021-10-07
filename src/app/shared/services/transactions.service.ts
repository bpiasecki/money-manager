import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BaseDbService } from '@core/db/baseDb.service';
import { Endpoints } from '@core/db/endpoints.enum';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';

@Injectable()
export class TransactionsService extends BaseDbService<TransactionItem> {

    constructor(db: AngularFireDatabase, http: HttpClient) {
        super(Endpoints.Transactions, db, http);
    }

}