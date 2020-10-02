import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IParticipanttable} from '../../../models/participanttable.model';
import {IAppState} from '../../../store/store';
import {select, Store} from '@ngrx/store';
import {getLastUpdated} from '../../../store/participanttable/participanttable.reducer';
import {getParticipant} from '../../../store/participant/participant.reducer';

@Component({
  selector: 'app-deelnemertop5',
  templateUrl: './deelnemertop5.component.html',
  styleUrls: ['./deelnemertop5.component.scss']
})
export class Deelnemertop5Component implements OnInit {

  constructor(private store: Store<IAppState>) {
  }

  @Input() top: number;
  @Input() stand$: Observable<IParticipanttable[]>;
  @Input() isRegistrationOpen$: Observable<boolean>;
  @Input() lastUpdated: string;
  @Input() title: string;
  @Input() participantPrediction: IParticipanttable;

  participantId: string;

  ngOnInit() {
    this.store.pipe(select(getParticipant)).subscribe(participant => {
      if (participant) {
        this.participantId = participant.id;
      }
    });
  }

}
