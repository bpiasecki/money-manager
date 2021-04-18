import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

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

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router, private db: AngularFireDatabase) {
    this.authService.authState$.subscribe((user) => {
      console.log(user)
      if (user) {
        this.isUserLogged = true;
        this.router.navigate(['/overview']);
      } else {
        this.isUserLogged = false;
        this.router.navigate(['/login']);
      }
      this.dataLoaded = true;
    })
    this.itemsRef = db.list<any>('items');
    this.items = db.list<any>('items').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['login'])
    });
  }

  addData() {
    const data = { name: "AudunCoffee", rating: 8 }
    // const obj = this.db.object('coffee');
    // this.itemData = obj.valueChanges().pipe(tap((res) => console.log(res)));
    // obj.set(data).then(res => { console.log(res) }, err => Promise.reject(err));


    const itemsRef = this.db.list('items');
    itemsRef.push(data);
  }

  itemData: Observable<unknown>;
  getData() {
    // this.db.list('coffees').set().subscribe((result) => console.log(result));
  }

  updateItem(key: string, newValue: string) {
    this.itemsRef.update(key, {name: newValue})
  }

}
