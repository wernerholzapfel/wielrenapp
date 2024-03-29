import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as tour from './tour.actions';
import * as etappe from '../etappe/etappe.actions';
import * as tourrider from '../tourriders/tourrider.actions';

import {TourService} from '../../services/tour.service';
import {from, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {UPDATE_RIDER_FROM_TEAM} from './tour.actions';

@Injectable()
export class TourEffects {
  constructor(private actions$: Actions,
              private tourService: TourService) {
  }

  fetchTour$ = createEffect(() => this.actions$
    .pipe(
      ofType<tour.
          FetchTour>(tour.FETCH_TOUR),
      switchMap(action => {
        return this.tourService
          .getTour()
          .pipe(switchMap(tourResponse =>
              of(new tour.FetchTourSuccess(tourResponse))),
            catchError(err => of(new tour.FetchTourFailure(err))));
      })));

  fetchTourById$ = createEffect(() => this.actions$
    .pipe(ofType<tour.FetchTourById>(tour.FETCH_TOUR_BY_ID),
      switchMap(action => {
        return this.tourService
          .getTourById(action.payload)
          .pipe(switchMap(tourResponse =>
              of(new tour.FetchTourSuccess(tourResponse))),
            catchError(err => of(new tour.FetchTourFailure(err))));
      })));

  fetchTourSuccess$ = createEffect(() => this.actions$
    .pipe(ofType<tour.FetchTourSuccess>(tour.FETCH_TOUR_SUCCESS),
      switchMap(action =>
        from([new etappe.FetchEtappeList(action.payload.id),
          new etappe.FetchLatestEtappe(action.payload.id),
          new tourrider.FetchTourriderList(action.payload.id)])),
      catchError(err => of(new tour.FetchTourFailure(err)))));


  fetchTourList$ = createEffect(() => this.actions$
    .pipe(
      ofType<tour.FetchTourList>(tour.FETCH_TOURLIST),
      switchMap(action => {
        return this.tourService
          .getTourlist()
          .pipe(switchMap(tourResponse =>
              of(new tour.FetchTourListSuccess(tourResponse))
            ),
            catchError(err => of(new tour.FetchTourListFailure(err))));
      })));

  // @Effect()
  // updateTour$ = this.actions$
  //   .ofType<tour.SetCurrentRiderAsSelected>(tour.FETCH_TOUR)
  //   .switchMap(action => Observable.of(new tour.FetchTourSuccess(action.payload)))
  //   .catch(err => Observable.of(new tour.FetchTourFailure(err)));

  saveRiderToTeam$ = createEffect(() => this.actions$
    .pipe(ofType<tour.SaveRiderToTeam>(tour.SAVE_RIDER_TO_TEAM),
      switchMap(action => {
        return this.tourService.addRidertoTeam(action.payload);
      }))
    .pipe(
      switchMap(action => of(new tour.SaveRiderToTeamSuccess(action))),
      catchError(err => of(new tour.SaveRiderToTeamFailure(err)))));

  deleteRiderFromTeam$ = createEffect(() => this.actions$
    .pipe(ofType<tour.DeleteRiderFromTeam>(tour.DELETE_RIDER_FROM_TEAM),
      switchMap(action => {
        return this.tourService.deleteRiderFromTourridersTeam(action.payload)
          .pipe(switchMap(x => {
            return of(action.payload);
          }));
      }))
    .pipe(
      switchMap(action => of(new tour.DeleteRiderFromTeamSuccess(action))),
      catchError(err => of(new tour.DeleteRiderFromTeamFailure(err)))));

  updateRiderToTeam$ = createEffect(() => this.actions$
    .pipe(ofType<tour.UpdateRiderFromTeam>(tour.UPDATE_RIDER_FROM_TEAM),
      switchMap(action => {
        return this.tourService.addRidertoTeam(action.payload);
      }))
    .pipe(
      switchMap(action => of(new tour.UpdateRiderFromTeamSuccess(action))),
      catchError(err => of(new tour.UpdateRiderFromTeamFailure(err)))));
}
