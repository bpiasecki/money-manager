import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'money-manager';
  isFullScreenMode = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  fullScreenBreakpoint$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 1400px)', '(max-height: 800px)'])
    .pipe(
      map(result => {console.log(result); return result.matches}),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }
}
