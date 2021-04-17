import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'money-manager';
  isFullScreenMode = false;
  isUserLogged = false;
  dataLoaded = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  fullScreenBreakpoint$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 1400px)', '(max-height: 800px)'])
    .pipe(
      map(result => { console.log(result); return result.matches }),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router) {
    this.authService.authState$.subscribe((user) => {
      console.log(user)
      if(user) {
        this.isUserLogged = true;
        this.router.navigate(['/overview']);
      } else {
        this.isUserLogged = false;
        this.router.navigate(['/login']);
      }
      this.dataLoaded = true;
    })
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['login'])
    });
  }

}
