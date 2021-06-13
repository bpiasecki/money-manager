import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DbService } from '@core/db/db.service';
import { UserDataService } from '@shared/services/userData.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private readonly mainRouterLinks = ['/', '/accounts', '/transactions'];
  public tabsVisible: boolean;
  public $isLoading: Observable<boolean>;
  public bgLoading = false;
  public currentUrl: string | undefined;
  public backgroundImage: string;
  private backgroundIndex = 0;
  private backgroundImages = [
    "../assets/images/bg-image-small.jpg",
    "https://images.unsplash.com/photo-1508556497405-ed7dcd94acfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=100",
    "https://images.unsplash.com/photo-1440688807730-73e4e2169fb8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=100",
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=100",
    "https://images.unsplash.com/photo-1502252430442-aac78f397426?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=100",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1506&q=100",
    "https://images.unsplash.com/photo-1563950708942-db5d9dcca7a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=100",
    "https://images.unsplash.com/photo-1468581264429-2548ef9eb732?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=100",
    "https://images.unsplash.com/photo-1579294800821-694d95e86143?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=100"
  ]


  constructor(private authService: AuthService, private spinner: NgxSpinnerService, private router: Router, public dbService: DbService, private userDataService: UserDataService) {
    this.spinner.show();
    this.dbService.$isLoading.subscribe((isLoading) => isLoading ? this.spinner.show() : this.spinner.hide());

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: Partial<NavigationEnd>) => {
        this.tabsVisible = this.mainRouterLinks.some(link => link === event.url || link === event.urlAfterRedirects)
        this.currentUrl = event.urlAfterRedirects;
      });

    this.userDataService.getBackgroudImage().subscribe((url) => {
      if (url) {
        localStorage.setItem('bgUrl', url);
        this.backgroundIndex = this.backgroundImages.findIndex(imgUrl => imgUrl == url)
      }

      this.setBackground(url ?? localStorage.getItem('bgUrl') ?? this.backgroundImages[0]);
    })

  }

  logout() {
    this.authService.logout().then(() => 
      this.router.navigate(['login'])
    );
  }

  public changeBackground(): void {
    this.bgLoading = true;
    this.backgroundIndex = this.backgroundImages.length - 1 == this.backgroundIndex ? 0 : this.backgroundIndex + 1;
    const url = this.backgroundImages[this.backgroundIndex];
    this.userDataService.setBackgroundImage(url).pipe(first()).subscribe();
  }

  private setBackground(url: string): void {
    const img = new Image();

    img.onload = () => {
        this.backgroundImage = `url(${url})`;
        this.bgLoading = false;
    };

    img.src = url;
  }

}
