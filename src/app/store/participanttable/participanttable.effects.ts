import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as participanttable from './participanttable.actions';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {IParticipanttable} from '../../models/participanttable.model';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {ParticipantService} from '../../services/participant.service';
import {UitslagenService} from '../../services/uitslagen.service';

@Injectable()
export class ParticipanttableEffects {
  constructor(private actions$: Actions, private db: AngularFireDatabase, private uitslagenService: UitslagenService) {
  }

  fetchParticipanttable$ = createEffect(() => this.actions$
    .pipe(
      ofType<participanttable.FetchParticipanttable>(participanttable.FETCH_PARTICIPANTTABLE),
      switchMap(action => {
      return this.uitslagenService.getTotaalStand(action.payload)
        .pipe(
          switchMap(participanttableResponse =>
            of(new participanttable.FetchParticipanttableSuccess(participanttableResponse))),
          catchError(err => of(new participanttable.FetchParticipanttableFailure(err))));
    })));

  fetchLastupdated$ = createEffect(() => this.actions$
    .pipe(ofType<participanttable.FetchLastUpdated>(participanttable.FETCH_LASTUPDATED),
      switchMap(action => {
      return this.db.object<IParticipanttable[]>(action.payload + '/lastUpdated/').valueChanges()
        .pipe(switchMap(response =>
            of(new participanttable.FetchLastUpdatedSuccess(response))),
          catchError(err => of(new participanttable.FetchLastUpdatedFailure(err))));
    })));
}
