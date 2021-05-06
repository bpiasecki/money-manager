import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable()
export class BaseService {

    private addNewItemSource = new Subject();
    public $addNewItem = this.addNewItemSource.asObservable();

    private panelOpenedSource = new BehaviorSubject<boolean>(false);
    public $panelOpened = this.panelOpenedSource.asObservable();

    public $isHandset = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(private breakpointObserver: BreakpointObserver) { }

    addNewItem() {
        this.addNewItemSource.next();
    }

}