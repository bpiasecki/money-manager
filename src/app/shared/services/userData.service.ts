import { Injectable } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserDataService {


    constructor(private authService: AuthService) {
    }

    // public setUserName(name: string, userId: string | undefined): Promise<void> {
    //     if (!userId)
    //         return Promise.resolve();

    //     return this.db.object(`${userId}/userName`).set(name);
    // }

    public setBackgroundImage(imageUrl: string): Observable<void> {
        return this.authService.setBackgroundImage(imageUrl);
        
        // return this.authService.getUserId().pipe(switchMap((userId) =>
        //     this.db.object<string>(`${userId}/backgroundImage`).set(imageUrl)
        // ));
    }

    public getBackgroudImage(): Observable<string | null> {
        // return this.authService.getUserId().pipe(switchMap((userId) =>
        //     this.db.object<string>(`${userId}/backgroundImage`).valueChanges()
        // ));
        return this.authService.$user.pipe(map(item => item.backgroundImage))
    }
}