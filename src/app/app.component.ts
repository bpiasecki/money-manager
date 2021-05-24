import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '@core/services/base.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';

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

  isHandset$: Observable<boolean>;

  fullScreenBreakpoint$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 1400px)', '(max-height: 800px)'])
    .pipe(
      map(result => { console.log(result); return result.matches }),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router, private baseService: BaseService) {
    this.authService.authState$.subscribe((user) => {
      console.log(user)
      if (!user) {
        this.isUserLogged = false;
        this.router.navigate(['/login']);
      } else {
        this.isUserLogged = true;
        this.router.navigate(['/accounts']);
      }
      this.dataLoaded = true;
    })

    this.isHandset$ = this.baseService.$isHandset;
  }

  addNewItem() {
    this.baseService.addNewItem();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['login'])
    });
  }

}
