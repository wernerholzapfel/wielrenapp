import {Component, OnInit} from '@angular/core';

import {IonRouterOutlet, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {select, Store} from '@ngrx/store';
import * as fromTour from './store/tour/tour.actions';
import {slideInAnimation} from './animations';
import {getTour} from './store/tour/tour.reducer';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {ITour} from './models/tour.model';
import * as fromParticipanttable from './store/participanttable/participanttable.actions';

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

    tour$: Observable<ITour>;
    selectedTour: ITour;
    unsubscribe = new Subject<void>();

    ngOnInit() {
        this.store.dispatch(new fromTour.FetchTourList);
        this.store.dispatch(new fromTour.FetchTour());

        this.tour$ = this.store.pipe(select(getTour));
        this.tour$.pipe(takeUntil(this.unsubscribe)).subscribe(tour => {
            if (tour && tour.id) {
                this.selectedTour = tour;
                this.store.dispatch(new fromParticipanttable.FetchParticipanttable(tour.id));
                this.store.dispatch(new fromParticipanttable.FetchLastUpdated(tour.id));
            }
        });
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
