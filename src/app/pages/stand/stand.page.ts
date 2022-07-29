import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IAppState} from '../../store/store';
import {select, Store} from '@ngrx/store';
import {getLastUpdated, getParticipanttable} from '../../store/participanttable/participanttable.reducer';
import {takeUntil} from 'rxjs/operators';
import * as dayjs from 'dayjs';
import {combineLatest, Observable, Subject} from 'rxjs';
import {IParticipanttable} from '../../models/participanttable.model';
import {IonSelect} from '@ionic/angular';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as fromParticipanttable from '../../store/participanttable/participanttable.actions';
import {UiServiceService} from '../../services/ui-service.service';
import {Router} from '@angular/router';
import {getParticipant} from '../../store/participant/participant.reducer';
import {ITotaalStand} from '../../models/uitslagen.model';
dayjs.extend(relativeTime);

@Component({
    selector: 'app-stand',
    templateUrl: './stand.page.html',
    styleUrls: ['./stand.page.scss'],
})
export class StandPage implements OnInit, OnDestroy {

    constructor(private store: Store<IAppState>, private uiService: UiServiceService, private router: Router) {
    }

    @ViewChild('selectsort') selectsortRef: IonSelect;

    showDetail = false;
    participantstable: ITotaalStand[];
    lastUpdated$: Observable<any>;
    lastUpdated: string;
    selectedSort = 'totaalpunten';
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
        this.store.dispatch(new fromParticipanttable.FetchParticipanttable(this.uiService.selectedTour.id));


        combineLatest([this.store.pipe(select(getParticipanttable)), this.store.pipe(select(getParticipant))])
            .subscribe(([participantTable, participant]) => {
                if (participantTable) {
                    this.participantstable = participant ? participantTable.map(p => {
                        return {
                            ...p,
                            eigenvoorspelling: p.id === participant.id
                        };
                    }) : participantTable;
                }
        });

        this.store.pipe(select(getLastUpdated))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(lastupdated => {
                console.log(lastupdated);
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
    openDeelnemer(line) {
        this.router.navigate(['/tabs/team', {id: line.id}], {state: line});
    }
}
