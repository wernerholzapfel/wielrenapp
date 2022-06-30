import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subject, switchMap, take, timer} from 'rxjs';
import {IAppState} from '../../store/store';
import {select, Store} from '@ngrx/store';
import {getLastUpdated} from '../../store/participanttable/participanttable.reducer';
import {takeUntil} from 'rxjs/operators';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as localeNL from 'dayjs/locale/nl';
import {getDeadline, getTour, isRegistrationOpen} from '../../store/tour/tour.reducer';

dayjs.locale(localeNL);
dayjs.extend(relativeTime);

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

    constructor(private store: Store<IAppState>) {
    }

    lastUpdated$: Observable<any>;
    lastUpdated: string;
    isRegistrationOpen$: Observable<boolean>;
    unsubscribe = new Subject<void>();
    deadlinetimer: string;
    tourDeadline: any;

    ngOnInit() {
        this.lastUpdated$ = this.store.pipe(select(getLastUpdated));
        this.lastUpdated$.pipe(takeUntil(this.unsubscribe)).subscribe(lastupdated => {
            if (lastupdated) {
                this.lastUpdated = dayjs(lastupdated.lastUpdated).fromNow();
            }
        });

        this.isRegistrationOpen$ = this.store.select(isRegistrationOpen);

        this.store.pipe(select(getDeadline)).pipe(switchMap(deadline => {
            this.tourDeadline = dayjs(deadline);
            const now = dayjs();
            return timer(100, 1000) // timer(firstValueDelay, intervalBetweenValues)
                .pipe(map(i => this.tourDeadline.diff(now, 'second') - i)).pipe(take(this.tourDeadline.diff(now, 'second')));
        })).subscribe(i => {
            this.deadlinetimer = dayjs().to(dayjs(this.tourDeadline));
        });
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
