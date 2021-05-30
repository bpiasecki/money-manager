import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Endpoints } from '@core/db/endpoints.enum';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';
import { AuthService } from '@core/services/auth.service';
import { BaseDbService } from '@core/services/baseDb.service';

@Injectable()
export class TransactionsService extends BaseDbService<TransactionItem> {

    constructor(authService: AuthService, db: AngularFireDatabase) {
        super(Endpoints.Transactions, new TransactionItem(), authService, db);
    }

}