import {Component, OnDestroy, OnInit} from '@angular/core';
import {IParticipant} from '../../models/participant.model';
import {of, Subject, switchMap, takeUntil} from 'rxjs';
import {ParticipantService} from '../../services/participant.service';
import {IAppState} from '../../store/store';
import {select, Store} from '@ngrx/store';
import {getTour} from '../../store/tour/tour.reducer';

@Component({
  selector: 'app-deelnemers',
  templateUrl: './deelnemers.page.html',
  styleUrls: ['./deelnemers.page.scss'],
})
export class DeelnemersPage implements OnInit, OnDestroy {

  participants: IParticipant[];
  unsubscribe = new Subject<void>();

  constructor(private participantService: ParticipantService, private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(getTour))
        .pipe(switchMap(tour => {
          if (tour && tour.id) {
            return this.participantService.getParticipants(tour.id);
          } else {
            return of(undefined);
          }
        })).pipe(takeUntil(this.unsubscribe)).subscribe(participantsResponse => {
      if (participantsResponse) {
        this.participants = participantsResponse.map(item => item);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}

