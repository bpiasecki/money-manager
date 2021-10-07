import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private BASE_URL = 'http://localhost:3000';
  user: any;

  constructor(private http: HttpClient, private router: Router) { }


  getUserId(): Observable<number | undefined> {
    return of(this.user?.id ?? null)
  }

  login(username: string, password: string) {
    return this.http.post(`${this.BASE_URL}/auth/signin`, { username, password }).pipe(tap((result: any) => {
      console.log(result)
      const accessToken = result.accessToken;
      localStorage.setItem('token', accessToken)
      this.user = result.user;
    }));
  }

  register(username: string, password: string): Observable<number> {
    return this.http.post(`${this.BASE_URL}/auth/signup`, { username, password }).pipe(map(res => <number>res));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}