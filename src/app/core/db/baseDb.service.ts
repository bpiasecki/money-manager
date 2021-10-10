import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class BaseDbService<T> {

    protected userId: string | undefined;
    protected api: string;
    // protected api: string = 'http://localhost:3000/';
    // protected api: string = 'https://money-manager-bp.herokuapp.com/';

    constructor(protected endpoint: string, protected http: HttpClient) {
        this.api = environment.BASE_URL + endpoint
    }

    public getItems(): Observable<T[]> {
        return this.http.get(this.api).pipe(map(res => <T[]>res))
    }

    public addNewItem(item: T): Observable<T> {
        return this.http.post(this.api, item).pipe(map((res) => <T>res));
    }

    public removeItem(id: number): Observable<any> {
        return this.http.delete(`${this.api}/${id}`);
    }

    public updateItem(id: number, updatedItem: T): Observable<any> {
        return this.http.patch(`${this.api}/${id}`, updatedItem)
    }
}