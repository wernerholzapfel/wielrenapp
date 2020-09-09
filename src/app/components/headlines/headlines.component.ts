import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {IHeadline} from '../../models/headline.model';
import {ITour} from '../../models/tour.model';
import {HeadlinesService} from '../../services/headlines.service';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {getTour} from '../../store/tour/tour.reducer';
import {switchMap, takeUntil} from 'rxjs/operators';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as localeNL from 'dayjs/locale/nl';

dayjs.locale(localeNL);
dayjs.extend(relativeTime);

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.component.html',
  styleUrls: ['./headlines.component.scss'],
})
export class HeadlinesComponent implements OnInit, OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();
  lastUpdated: string;
  headline: IHeadline;
  headlineIndex = 0;
  headlines: IHeadline[];
  tour$: Observable<ITour>;

  constructor(private headlineService: HeadlinesService, private store: Store<IAppState>) {
  }

  ngOnInit() {

    this.tour$ = this.store.pipe(select(getTour));

    this.tour$.pipe(switchMap(tour => {
      return tour ? of(tour.id) : of(null);
    }))
        .pipe(switchMap(tourId => {
          return tourId ? this.headlineService.getHeadlines(tourId) : of(null);
        }))
        .pipe(takeUntil(this.unsubscribe)).subscribe(headlines => {
          if (headlines) {
            this.headlines = headlines;
            this.headline = headlines[this.headlineIndex];
            this.lastUpdated = dayjs(this.headline.createdDate).fromNow();
          }
        }
    );
  }

  nextHeadline() {
    this.headlineIndex++;
    this.headline = this.headlines[this.headlineIndex];
    this.lastUpdated = dayjs(this.headline.createdDate).fromNow();

  }

  previousHeadline() {
    this.headlineIndex--;
    this.headline = this.headlines[this.headlineIndex];
    this.lastUpdated = dayjs(this.headline.createdDate).fromNow();

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
