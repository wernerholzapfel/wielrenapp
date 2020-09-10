import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IAppState} from '../../store/store';
import {select, Store} from '@ngrx/store';
import {getLastUpdated, getParticipanttable} from '../../store/participanttable/participanttable.reducer';
import {takeUntil} from 'rxjs/operators';
import * as dayjs from 'dayjs';
import {Observable, Subject} from 'rxjs';
import {IParticipanttable} from '../../models/participanttable.model';
import {IonSelect} from '@ionic/angular';

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
    unsubscribe = new Subject<void>();

    ngOnInit() {
        this.store.pipe(select(getParticipanttable)).subscribe(participantTable => {
            this.participantstable = participantTable;
        });
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

    openSelectSort() {
        this.selectsortRef.open();
    }

    sortTable(event: any) {
        this.selectedSort = event.detail.value;

        this.participantstable = this.participantstable.slice().sort((a, b) => {
            return b[this.selectedSort] - a[this.selectedSort];
        });
    }

}
