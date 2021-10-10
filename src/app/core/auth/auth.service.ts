import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environment/environment';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable()
export class AuthService {

  // private BASE_URL = 'http://localhost:3000';
  // private BASE_URL = 'https://money-manager-bp.herokuapp.com';


  private userSource = new ReplaySubject<User>(1);
  public $user = this.userSource.asObservable();

  private backgroundImageSource = new BehaviorSubject<string | null>(null);
  public $backgroundImage = this.backgroundImageSource.asObservable();

  private api: string;

  constructor(private http: HttpClient, private router: Router) {
    this.api = environment.BASE_URL + 'auth';
  }


  getUserId(): Observable<number | undefined> {
    return this.$user.pipe(map(item => item.id))
  }

  login(username: string, password: string): Observable<{ accessToken: string, user: User }> {
    return this.http.post(this.api + '/signin', { username, password }).pipe(tap((result: any) => {
      const accessToken = result.accessToken;
      localStorage.setItem('token', accessToken)
      this.userSource.next(result.user);
      this.backgroundImageSource.next(result.user.backgroundImage)
    }));
  }

  register(username: string, password: string): Observable<number> {
    return this.http.post(this.api + '/signup', { username, password }).pipe(map(res => <number>res));
  }

  setBackgroundImage(imageUrl: string): Observable<any> {
    return this.http.patch(this.api + '/setBackgroundImage', { imageUrl }).pipe(tap(() => this.backgroundImageSource.next(imageUrl)))
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}