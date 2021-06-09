import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '@core/auth/auth.service';
import { BaseDbService } from '@core/db/baseDb.service';
import { Endpoints } from '@core/db/endpoints.enum';
import { TransactionItem } from '@core/models/transactions/transactionItem.model';

@Injectable()
export class TransactionsService extends BaseDbService<TransactionItem> {

    constructor(authService: AuthService, db: AngularFireDatabase) {
        super(Endpoints.Transactions, authService, db);
    }

}