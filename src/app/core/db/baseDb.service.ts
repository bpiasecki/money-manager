import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class BaseDbService<T> {

    protected userId: string | undefined;
    protected api: string = 'http://localhost:3000/';

    constructor(protected endpoint: string, protected db: AngularFireDatabase, protected http: HttpClient) { }

    public getItems(): Observable<T[]> {
        return this.http.get(this.api + this.endpoint).pipe(map(res => {
            console.log(res)
            return <T[]>res
        }))
    }

    public addNewItem(item: T): Observable<T> {
        return this.http.post(`${this.api}${this.endpoint}`, item).pipe(map((res) => <T>res));
    }

    public removeItem(id: number): Observable<any> {
        return this.http.delete(`${this.api}${this.endpoint}/${id}`);
    }

    public updateItem(id: number, updatedItem: T): Observable<any> {
        return this.http.patch(`${this.api}${this.endpoint}/${id}`, updatedItem)
    }
}