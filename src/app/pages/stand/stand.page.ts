import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAppState} from '../../store/store';
import {select, Store} from '@ngrx/store';
import {getLastUpdated, getParticipanttable} from '../../store/participanttable/participanttable.reducer';
import {takeUntil} from 'rxjs/operators';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as localeNL from 'dayjs/locale/nl';
import {Observable, Subject} from 'rxjs';
import {IParticipanttable} from '../../models/participanttable.model';

@Component({
  selector: 'app-stand',
  templateUrl: './stand.page.html',
  styleUrls: ['./stand.page.scss'],
})
export class StandPage implements OnInit, OnDestroy {

  constructor(private store: Store<IAppState>) { }

  participantstable$: Observable<IParticipanttable[]>;
  lastUpdated$: Observable<any>;
  lastUpdated: string;
  unsubscribe = new Subject<void>();

  ngOnInit() {
    this.participantstable$ = this.store.pipe(select(getParticipanttable));
    this.lastUpdated$ = this.store.pipe(select(getLastUpdated));

    this.lastUpdated$.pipe(takeUntil(this.unsubscribe)).subscribe(lastupdated => {
      if (lastupdated) {
        this.lastUpdated = dayjs(lastupdated.lastUpdated).fromNow();
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
