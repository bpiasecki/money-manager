import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BaseDbService } from '@core/db/baseDb.service';
import { Endpoints } from '@core/db/endpoints.enum';
import { CategoryItem } from '@core/models/categories/categoryItem.model';

@Injectable()
export class CategoriesService extends BaseDbService<CategoryItem> {


    constructor(protected db: AngularFireDatabase, protected http: HttpClient) {
        super(Endpoints.Categories, db, http);
    }

    //insert initial categories right after user registration process
    public setInitialCategories(userId: number) {
        return this.http.post(`${this.api}${this.endpoint}/set-initial`, { userId });
    }
}
