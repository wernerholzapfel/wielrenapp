import {Component, OnDestroy, OnInit} from '@angular/core';

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
import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed
} from '@capacitor/core';
import {Router} from '@angular/router';

const {PushNotifications} = Plugins;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    animations: [
        slideInAnimation
        // animation triggers go here
    ]
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private store: Store,
        private router: Router,
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

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            if (this.platform.is('cordova')) {
                this.setupPush();
            }
        });
    }

    prepareRoute(outlet: IonRouterOutlet) {
        return outlet?.isActivated && outlet.activatedRouteData.animation
            || '';
    }

    setupPush() {
        // Request permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        PushNotifications.requestPermission().then(result => {
            if (result.granted) {
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register();
            } else {
                // Show some error
            }
        });

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
            (token: PushNotificationToken) => {
                // todo send token to backend
                // alert('Push registration success, token: ' + token.value);
            }
        );

        // Some issue with our setup and push will not work
        // PushNotifications.addListener('registrationError',
        //     (error: any) => {
        // alert('Error on registration: ' + JSON.stringify(error));
        // }
        // );

        // Show us the notification payload if the app is open on our device
        // PushNotifications.addListener('pushNotificationReceived',
        //     (notification: PushNotification) => {
        // alert('Push received: ' + JSON.stringify(notification));
        // }
        // );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: PushNotificationActionPerformed) => {
                this.router.navigate(['tabs/stand']);
            }
        );

    }
}
