import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ITourriders} from '../../models/tourriders.model';
import {IRider} from '../../models/rider.model';
import {IAppState} from '../../store/store';
import {RiderService} from '../../services/rider.service';
import {select, Store} from '@ngrx/store';
import {FetchRiders} from '../../store/rider/rider.actions';
import {getTourriders} from '../../store/tourriders/tourrider.reducer';
import {takeUntil} from 'rxjs/operators';
import {IonSelect} from '@ionic/angular';
import {Prediction} from '../../models/participanttable.model';
import {IRennerTableSummary} from '../../components/renner-table-summary/renner-table-summary.component';
import {getTour} from '../../store/tour/tour.reducer';
import {ITour} from '../../models/tour.model';

@Component({
    selector: 'app-renners',
    templateUrl: './renners.page.html',
    styleUrls: ['./renners.page.scss'],
})
export class RennersPage implements OnInit, OnDestroy {

    @ViewChild('selectsort') selectsortRef: IonSelect;

    @Output() addPositionEvent: EventEmitter<IRider> = new EventEmitter<IRider>();

    selectedSort = 'totalTourPoints';
    showDetail = false;
    searchTerm: string;
    tour: ITour;
    riders: IRennerTableSummary[];
    uitgevallenRiders: IRennerTableSummary[];
    unsubscribe = new Subject<void>();
    segmentView = 'punten';

    constructor(private riderService: RiderService, private store: Store<IAppState>) {
    }

    /**
     * Set the sort after the view init since this component will
     * be able to query its view for the initialized sort.
     */

    ngOnInit() {
        this.store.pipe(select(getTour))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(tour => {
                this.tour = tour;
                if (new Date(this.tour.deadline) < new Date()) {
                    // todo refactor for example  subscribe until
                    // todo move to store?
                    this.riderService.getDetailTourriders(tour.id)
                        .subscribe(response => {
                            console.log(response);
                            this.riders = response.map(rider => this.mapToRennerTableSummary(rider));
                            this.sortRenners(this.selectedSort);
                        });
                } else {
                    this.riders = [];
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

    sortRenners(sort: string) {
        this.selectedSort = sort === 'gekozen' ? this.selectedSort : sort;
        this.riders = this.riders.slice().sort((a, b) => {
            switch (sort) {
                case 'totalTourPoints':
                    return b.points.totalTourPoints - a.points.totalTourPoints;
                case 'totalMountainPoints':
                    return b.points.totalMountainPoints - a.points.totalMountainPoints;
                case 'totalPointsPoints':
                    return b.points.totalPointsPoints - a.points.totalPointsPoints;
                case 'totalYouthPoints':
                    return b.points.totalYouthPoints - a.points.totalYouthPoints;
                case 'totalStagePoints':
                    return b.points.totalStagePoints - a.points.totalStagePoints;
                case 'deltaTotalStagePoints':
                    return b.points.deltaTotalStagePoints - a.points.deltaTotalStagePoints;
                case 'gekozen':
                    return b.gekozen - a.gekozen;
            }
        });
    }

    segmentChanged($event) {
        this.segmentView = $event.detail.value;
        this.sortRenners($event.detail.value === 'gekozen' ? $event.detail.value : this.selectedSort);
    }

    // addPosition(element: any) {
    //   if (element.type === 'cellValueChanged' && element.colDef.field === 'rider.position') {
    //     const updatedRider = Object.assign(element.data.rider, {position: element.newValue, id: element.data.id});
    //     this.addPositionEvent.emit(updatedRider);
    //   }
    // }

    mapToRennerTableSummary(rider: ITourriders): IRennerTableSummary {
        return {
            rider: {
                id: rider.rider.id,
                firstName: rider.rider.firstName,
                surName: rider.rider.surName,
                isOut: rider.isOut,
                nationality: rider.rider.nationality,
                waarde: rider.waarde
                // isBeschermdeRenner: line.isBeschermdeRenner,
                // isLinkebal: line.isLinkebal,
                // isMeesterknecht: line.isMeesterknecht,
                // isRider: line.isRider,
                // isWaterdrager: line.isWaterdrager,
            },
            latestEtappe: rider.latestEtappe,
            points: {
                totalTourPoints: this.determineTotaalpunten(rider),
                totalMountainPoints: rider.mountainPoints ? rider.mountainPoints : 0,
                totalPointsPoints: rider.pointsPoints ? rider.pointsPoints : 0,
                totalYouthPoints: rider.youthPoints ? rider.youthPoints : 0,
                totalStagePoints: rider.totalStagePoints ? rider.totalStagePoints : 0,
                deltaTotalStagePoints: 0, // todo
            },
            gekozen: rider.predictions ? rider.predictions.length : 0
        };
    }

    determineTotaalpunten(line: ITourriders): number {
        if (this.tour && this.tour.hasEnded) {
            return ((line.totalStagePoints ? line.totalStagePoints : 0) +
                (line.youthPoints ? line.youthPoints : 0) +
                (line.mountainPoints ? line.mountainPoints : 0) +
                (line.tourPoints ? line.tourPoints : 0) +
                (line.pointsPoints ? line.pointsPoints : 0));
        } else {
            return line.totalStagePoints ? line.totalStagePoints : 0;
        }
    }
}
