import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as participanttable from './participanttable.actions';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {IParticipanttable} from '../../models/participanttable.model';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {ParticipantService} from '../../services/participant.service';

@Injectable()
export class ParticipanttableEffects {
  constructor(private actions$: Actions, private db: AngularFireDatabase, private participantService: ParticipantService) {
  }

  @Effect()
  fetchParticipanttable$ = this.actions$
    .pipe(
      ofType<participanttable.FetchParticipanttable>(participanttable.FETCH_PARTICIPANTTABLE),
      switchMap(action => {
      return this.participantService.getStand(action.payload)
        .pipe(
          switchMap(participanttableResponse =>
            of(new participanttable.FetchParticipanttableSuccess(participanttableResponse))),
          catchError(err => of(new participanttable.FetchParticipanttableFailure(err))));
    }));

  @Effect()
  fetchLastupdated$ = this.actions$
    .pipe(ofType<participanttable.FetchLastUpdated>(participanttable.FETCH_LASTUPDATED),
      switchMap(action => {
      return this.db.object<IParticipanttable[]>(action.payload + '/lastUpdated/').valueChanges()
        .pipe(switchMap(response =>
            of(new participanttable.FetchLastUpdatedSuccess(response))),
          catchError(err => of(new participanttable.FetchLastUpdatedFailure(err))));
    }));
}
