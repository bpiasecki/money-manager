import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DbService } from '@core/services/db.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private readonly mainRouterLinks = ['/', '/accounts', '/transactions'];
  public dataLoaded = false;
  public tabsVisible: boolean;
  public $isLoading: Observable<boolean>;
  public currentUrl: string | undefined;

  constructor(private authService: AuthService, private spinner: NgxSpinnerService, private router: Router, public dbService: DbService) {
    this.dbService.$isLoading.subscribe((isLoading) => isLoading ? this.spinner.show() : this.spinner.hide());
    this.authService.authState$.subscribe((user) => {
      if (!user)
        this.router.navigate(['/login']);

      this.dataLoaded = true;
    })

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: Partial<NavigationEnd>) => {
        this.tabsVisible = this.mainRouterLinks.some(link => link === event.url || link === event.urlAfterRedirects)
        this.currentUrl = event.urlAfterRedirects;
      }
      );

  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['login'])
    });
  }

}
