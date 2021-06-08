import { AngularFireDatabase, AngularFireList, AngularFireObject, QueryFn } from '@angular/fire/database';
import { ItemKeyWithData } from '@core/models/itemKeyWithData.model';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export abstract class BaseDbService<T> {

    protected userId: string | undefined;

    constructor(protected endpoint: string, private defaultItem: T, private authService: AuthService, protected db: AngularFireDatabase) { }

    public getItems(): Observable<ItemKeyWithData<T>[]> {
        if (!this.userId) {
            return this.authService.getUserId().pipe(switchMap((userId) => {
                this.userId = userId;
                return this.getItemsFromDb();
            }))
        } else
            return this.getItemsFromDb();
    }

    private getItemsFromDb(): Observable<ItemKeyWithData<T>[]> {
        return this.getDbList().snapshotChanges().pipe(map((result) => {
            return result.map(item => new ItemKeyWithData(<string>item.key, <T>item.payload.val()));
        }))
    }

    public getItem(key: string | undefined): Observable<T> {
        if (!this.userId) {
            return this.authService.getUserId().pipe(switchMap((userId) => {
                this.userId = userId;
                return this.getItemFromDb(key);
            }))
        } else
            return this.getItemFromDb(key);
    }

    protected getItemFromDb(key: string | undefined): Observable<T> {
        return this.getDbItem(key).valueChanges().pipe(map(res => {
            return res ?? { ...this.defaultItem };
        }));
    }

    public addNewItem(item: T): firebase.default.database.ThenableReference {
        return this.getDbList().push(item);
    }

    public removeItem(key: string): Promise<void> {
        return this.getDbItem(key).remove();
    }

    public updateItem(key: string, updatedItem: T): Promise<void> {
        return this.getDbItem(key).update(updatedItem);
    }

    protected getDbItem(itemKey: string | undefined): AngularFireObject<T> {
        if (!this.userId)
            throw new Error("User ID is null");

        return this.db.object<T>(`${this.userId}/${this.endpoint}/${itemKey}`);
    }

    protected getDbList(queryFn?: QueryFn): AngularFireList<T> {
        if (!this.userId)
            throw new Error("User ID is null");

        return this.db.list<T>(`${this.userId}/${this.endpoint}`, queryFn);
    }
}