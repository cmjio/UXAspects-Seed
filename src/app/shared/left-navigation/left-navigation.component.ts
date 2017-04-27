import { PageHeaderComponent } from './../page-header/page-header.component';
import { Component, Inject, Injectable, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'my-left-navigation',
    templateUrl: './left-navigation.component.html'
})
@Injectable()
export class LeftNavigationComponent implements OnDestroy {

    previousWindowWidth: number;
    collapseWidth: number;

    constructor(@Inject('$navigationMenu') private $navigationMenu: any) {
        document.body.classList.add("animate-navbar");        

        this.previousWindowWidth = window.innerWidth;
        this.collapseWidth = this.$navigationMenu.collapseAtWidth();

        Observable.fromEvent(window, 'resize').debounceTime(200).subscribe(this.onResize.bind(this));
    }

    onResize(event: Event) {
        if (window.innerWidth < this.collapseWidth && this.$navigationMenu.visible() && this.previousWindowWidth >= this.collapseWidth) {
            this.$navigationMenu.hide();
        } else if (window.innerWidth >= this.collapseWidth && !this.$navigationMenu.visible() && this.previousWindowWidth < this.collapseWidth) {
            this.$navigationMenu.show();
        }
        //store the old screen position so it only shows/hides when required and not every resize
        this.previousWindowWidth = window.innerWidth;
    }

    ngAfterViewInit() {
        $(document.getElementById('side-menu')).metisMenu();
    }

    ngOnDestroy() {
        document.removeEventListener('resize');
    }


    toggleSideNavigationFn() {
        if (this.$navigationMenu.visible()) {
            this.$navigationMenu.hide();
        } else {
            this.$navigationMenu.show();
        };
    }
}
