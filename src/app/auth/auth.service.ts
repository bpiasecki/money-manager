import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/index';
 
export interface Credentials {
  email: string;
  password: string;
}
 
@Injectable({providedIn: 'root'})
export class AuthService {
  readonly authState$: Observable<firebase.default.User | null> = this.fireAuth.authState;
 
  constructor(private fireAuth: AngularFireAuth) {}
 
  get user(): Promise<firebase.default.User | null> {
    return this.fireAuth.currentUser;
  }
 
  login({email, password}: Credentials) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
 
  register({email, password}: Credentials) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }
 
  logout() {
    return this.fireAuth.signOut();
  }
}