import { Injectable } from '@angular/core';

@Injectable()
export class UserDataService {

    //TODO - rewrite

    // constructor(private authService: AuthService, private db: AngularFireDatabase) {
    // }

    // public setUserName(name: string, userId: string | undefined): Promise<void> {
    //     if (!userId)
    //         return Promise.resolve();

    //     return this.db.object(`${userId}/userName`).set(name);
    // }

    // public setBackgroundImage(imageUrl: string): Observable<void> {
    //     return this.authService.getUserId().pipe(switchMap((userId) =>
    //         this.db.object<string>(`${userId}/backgroundImage`).set(imageUrl)
    //     ));
    // }

    // public getBackgroudImage(): Observable<string | null> {
    //     return this.authService.getUserId().pipe(switchMap((userId) =>
    //         this.db.object<string>(`${userId}/backgroundImage`).valueChanges()
    //     ));
    // }
}