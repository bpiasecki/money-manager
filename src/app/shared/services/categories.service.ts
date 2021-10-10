import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseDbService } from '@core/db/baseDb.service';
import { Endpoints } from '@core/db/endpoints.enum';
import { CategoryItem } from '@core/models/categories/categoryItem.model';
import { environment } from '@environment/environment';

@Injectable()
export class CategoriesService extends BaseDbService<CategoryItem> {


    constructor(protected http: HttpClient) {
        super(Endpoints.Categories, http);
    }

    //insert initial categories right after user registration process
    public setInitialCategories(userId: number) {
        return this.http.post(`${environment.BASE_URL}${this.endpoint}/set-initial`, { userId });
    }
}
