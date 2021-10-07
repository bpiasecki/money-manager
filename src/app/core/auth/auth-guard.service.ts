import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }
  canActivate() {
    const token = localStorage.getItem('token');
    if (!token)
      this.router.navigate(['/login'])

    return !!token;
  }
}