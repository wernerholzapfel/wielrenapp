import {Component, OnInit} from '@angular/core';

import {IonRouterOutlet, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Store} from '@ngrx/store';
import * as fromTour from './store/tour/tour.actions';
import {slideInAnimation} from './animations';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    animations: [
        slideInAnimation
        // animation triggers go here
    ]
})
export class AppComponent implements OnInit {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private store: Store
    ) {
        this.initializeApp();
    }

    ngOnInit() {
        this.store.dispatch(new fromTour.FetchTourList);
        this.store.dispatch(new fromTour.FetchTour());
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    prepareRoute(outlet: IonRouterOutlet) {
        return outlet?.isActivated && outlet.activatedRouteData.animation
            || '';
    }
}
