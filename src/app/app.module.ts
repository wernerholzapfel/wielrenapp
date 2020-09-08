import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {DateFnsModule} from 'ngx-date-fns';
import {effects, reducers} from './store/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {RiderService} from './services/rider.service';
import {TourService} from './services/tour.service';
import {PredictionService} from './services/prediction.service';
import {TeamService} from './services/teams.service';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {ParticipantService} from './services/participant.service';
import {EtappeService} from './services/etappe.service';
import {ClassificationsService} from './services/stageclassifications.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        SwiperModule,
        DateFnsModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
        AngularFireAuthModule,
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot(effects),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        RiderService,
        TourService,
        AuthService,
        TeamService,
        PredictionService,
        AuthGuardService,
        ParticipantService,
        EtappeService,
        ClassificationsService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
