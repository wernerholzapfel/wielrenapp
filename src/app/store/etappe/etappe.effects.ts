import {Injectable} from '@angular/core';
import {Actions, Effect, createEffect, ofType} from '@ngrx/effects';
import * as etappe from './etappe.actions';
import {EtappeService} from '../../services/etappe.service';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UitslagenService} from '../../services/uitslagen.service';

@Injectable()
export class EtappeEffects {
  constructor(private actions$: Actions,
              private etappeService: EtappeService,
              private uitslagenService: UitslagenService) {
  }

  @createEffect()
  fetchEtappeList$ = this.actions$
    .pipe(ofType<etappe.FetchEtappeList>(etappe.FETCH_ETAPPELIST),
      switchMap(action => {
        return this.etappeService
          .getEtappes(action.payload)
          .pipe(switchMap(etappeResponse =>
              of(new etappe.FetchEtappeListSuccess(etappeResponse.sort((a, b) => a.etappeNumber - b.etappeNumber)))),
            catchError(err => of(new etappe.FetchEtappeListFailure(err))));
      }));

  @Effect()
  fetchLatestEtappe$ = this.actions$
    .pipe(ofType<etappe.FetchLatestEtappe>(etappe.FETCH_LATESTETAPPE),
      switchMap(action => {
        return this.uitslagenService
          .getLatestDrivenEtappeStand(action.payload)
          .pipe(switchMap(etappeResponse =>
              of(new etappe.FetchLatestEtappeSuccess(etappeResponse))),
            catchError(err => of(new etappe.FetchLatestEtappeFailure(err))));
      }));
}
