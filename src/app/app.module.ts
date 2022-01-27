import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@capacitor/splash-screen';
import {StatusBar} from '@capacitor/status-bar';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DateFnsModule} from 'ngx-date-fns';
import {effects, reducers} from './store/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {RiderService} from './services/rider.service';
import {TourService} from './services/tour.service';
import {PredictionService} from './services/prediction.service';
import {TeamService} from './services/teams.service';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {ParticipantService} from './services/participant.service';
import {EtappeService} from './services/etappe.service';
import {ClassificationsService} from './services/stageclassifications.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        DateFnsModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
        AngularFireAuthModule,
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot(effects),
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        RiderService,
        TourService,
        AuthService,
        TeamService,
        PredictionService,
        AuthGuardService,
        ParticipantService,
        EtappeService,
        ClassificationsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
