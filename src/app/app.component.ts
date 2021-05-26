import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public dataLoaded = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authState$.subscribe((user) => {
      if (!user)
        this.router.navigate(['/login']);

      this.dataLoaded = true;
    })
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['login'])
    });
  }

}
