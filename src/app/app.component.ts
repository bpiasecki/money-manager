import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public dataLoaded = false;
  private readonly mainRouterLinks = ['/accounts', '/transactions'];
  public tabsVisible: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authState$.subscribe((user) => {
      if (!user)
        this.router.navigate(['/login']);

      this.dataLoaded = true;
    })

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: Partial<NavigationEnd>) =>
        this.tabsVisible = this.mainRouterLinks.some(link => link === event.url)
      );

  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['login'])
    });
  }

}
