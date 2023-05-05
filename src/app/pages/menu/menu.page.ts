import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IAppState} from '../../store/store';
import {select, Store} from '@ngrx/store';
import * as fromParticipantForm from '../../store/participantform/participantform.actions';
import {Observable} from 'rxjs';
import {ITour} from '../../models/tour.model';
import {getTour, getTours} from '../../store/tour/tour.reducer';
import * as fromTour from '../../store/tour/tour.actions';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


    constructor(public authService: AuthService, private store: Store<IAppState>) {
    }

    tours$: Observable<ITour[]>;
    tour$: Observable<ITour>;
    selectedTour: ITour;

    ngOnInit() {
        this.tours$ = this.store.pipe(select(getTours));
        this.tour$ = this.store.pipe(select(getTour));
    }

    logout() {
        this.authService.logout();
        this.store.dispatch(new fromParticipantForm.ClearParticipantform());
    }

    fetchTour(tourId) {
        this.store.dispatch(new fromTour.FetchTourById(tourId));
    }

}
