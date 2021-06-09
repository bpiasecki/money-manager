import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }
  canActivate() {
    return this.auth.getUserId().pipe(map((uid) => {
      if (!uid)
        this.router.navigate(['/login']);

      return !!uid;
    }));
  }
}