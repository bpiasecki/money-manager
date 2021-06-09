import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  readonly authState$: Observable<firebase.default.User | null> = this.fireAuth.authState;

  constructor(private fireAuth: AngularFireAuth) { }

  get user(): Promise<firebase.default.User | null> {
    return this.fireAuth.currentUser;
  }

  getUserId(): Observable<string | undefined> {
    return this.authState$.pipe(map((user) => user?.uid))
  }

  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fireAuth.signOut();
  }
}