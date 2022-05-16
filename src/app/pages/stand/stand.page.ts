import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IAppState} from '../../store/store';
import {select, Store} from '@ngrx/store';
import {getLastUpdated, getParticipanttable} from '../../store/participanttable/participanttable.reducer';
import {takeUntil} from 'rxjs/operators';
import * as dayjs from 'dayjs';
import {Observable, Subject} from 'rxjs';
import {IParticipanttable} from '../../models/participanttable.model';
import {IonSelect} from '@ionic/angular';
import * as relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

@Component({
    selector: 'app-stand',
    templateUrl: './stand.page.html',
    styleUrls: ['./stand.page.scss'],
})
export class StandPage implements OnInit, OnDestroy {

    constructor(private store: Store<IAppState>) {
    }

    @ViewChild('selectsort') selectsortRef: IonSelect;

    showDetail = false;
    participantstable: IParticipanttable[];
    lastUpdated$: Observable<any>;
    lastUpdated: string;
    selectedSort = 'totalPoints';
    activeStand = 'Totaalstand';
    unsubscribe = new Subject<void>();

    standOmschrijving = {
        totalPoints: 'Totaalstand',
        totalMountainPoints: 'Bergstand',
        totalPointsPoints: 'Puntenstand',
        totalYouthPoints: 'Jongerenstand',
        totalStagePoints: 'Etappestand',
        deltaTotalStagePoints: 'Delta'
    };

    ngOnInit() {
        this.store.pipe(select(getParticipanttable)).subscribe(participantTable => {
            this.participantstable = participantTable;
        });

        this.store.pipe(select(getLastUpdated))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(lastupdated => {
                console.log(lastupdated)
                if (lastupdated) {
                    this.lastUpdated = dayjs(lastupdated.lastUpdated).fromNow();
                }
            });
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    openSelectSort() {
        this.selectsortRef.open();
    }

    sortTable(event: any) {
        this.selectedSort = event.detail.value;
        this.activeStand = this.standOmschrijving[this.selectedSort];

        this.participantstable = this.participantstable.slice().sort((a, b) => {
            return b[this.selectedSort] - a[this.selectedSort];
        });
    }

}
