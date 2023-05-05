import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ITourriders } from '../../models/tourriders.model';
import { IRider } from '../../models/rider.model';
import { IAppState } from '../../store/store';
import { RiderService } from '../../services/rider.service';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { IonSelect } from '@ionic/angular';
import { IRennerTableSummary } from '../../components/renner-table-summary/renner-table-summary.component';
import { getTour } from '../../store/tour/tour.reducer';
import { ITour } from '../../models/tour.model';
import { ITeamScore } from 'src/app/models/teamscore.model';

@Component({
    selector: 'app-renners',
    templateUrl: './renners.page.html',
    styleUrls: ['./renners.page.scss'],
})
export class RennersPage implements OnInit, OnDestroy {

    @ViewChild('selectsort') selectsortRef: IonSelect;
    @ViewChild('gekozensort') openGekozenSortRef: IonSelect;

    @Output() addPositionEvent: EventEmitter<IRider> = new EventEmitter<IRider>();

    selectedSort = 'totalPoints';
    selectedGekozenRenner = 'gekozenRenner';
    showDetail = false;
    searchTerm: string;
    tour: ITour;
    riders: ITeamScore[];
    uitgevallenRiders: ITeamScore[];
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
                    this.riderService.getDetailTourriders(tour.id)
                        .subscribe(response => {
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
    openGekozenSort() {
        this.openGekozenSortRef.open();
    }

    sortRenners(sort: string) {
        if (this.segmentView === 'gekozen') {
            this.selectedGekozenRenner = sort
        } else {
            this.selectedSort = this.segmentView === 'uitgevallen' ? 'totalPoints' : sort
        }
        this.riders = this.riders.slice().sort((a, b) => {
            switch (sort) {
                case 'totalPoints':
                    return b.totaalpunten - a.totaalpunten;
                case 'totalTourPoints':
                    return b.algemeenpunten - a.algemeenpunten;
                case 'totalMountainPoints':
                    return b.bergpunten - a.bergpunten;
                case 'totalPointsPoints':
                    return b.puntenpunten - a.puntenpunten;
                case 'totalYouthPoints':
                    return b.jongerenpunten - a.jongerenpunten;
                case 'totalStagePoints':
                    return b.etappepunten - a.etappepunten;
                case 'waarde':
                    return b.tourrider_waarde - a.tourrider_waarde;
                case 'gekozenRenner':
                    return b.gekozenRenner - a.gekozenRenner;
                case 'gekozenBeschermderenner':
                    return b.gekozenBeschermderenner - a.gekozenBeschermderenner;
                case 'gekozenMeesterknecht':
                    return b.gekozenMeesterknecht - a.gekozenMeesterknecht;
                case 'gekozenWaterdrager':
                    return b.gekozenWaterdrager - a.gekozenWaterdrager;
                case 'gekozenLinkebal':
                    return b.gekozenLinkebal - a.gekozenLinkebal;
                case 'uitgevallen':
                    // todo sorteren
                    return;
                default:
                    console.log('default, check')
                    break;
            }
        });
    }

    segmentChanged($event) {
        this.segmentView = $event.detail.value;
        this.sortRenners($event.detail.value === 'uitgevallen' ?
            $event.detail.value : $event.detail.value === 'gekozen' ?
                this.selectedGekozenRenner : this.selectedSort);
    }

    // addPosition(element: any) {
    //   if (element.type === 'cellValueChanged' && element.colDef.field === 'rider.position') {
    //     const updatedRider = Object.assign(element.data.rider, {position: element.newValue, id: element.data.id});
    //     this.addPositionEvent.emit(updatedRider);
    //   }
    // }


    mapToRennerTableSummary(rider: ITourriders): ITeamScore {
        return {
            id: rider.id,
            displayName: 'displayname',
            teamName: 'teamname',
            prediction_id: '2',
            prediction_isRider: true,
            prediction_isWaterdrager: false,
            prediction_isMeesterknecht: false,
            prediction_isLinkebal: false,
            prediction_isBeschermderenner: false,
            prediction_isComplete: true,
            prediction_riderId: '3',
            prediction_tourId: null,
            prediction_participantId: null,
            tourrider_id: rider.id,
            tourrider_waarde: rider.waarde,
            tourrider_isOut: rider.isOut,
            tourrider_latestEtappeId: rider.latestEtappe ? rider.latestEtappe.id : null,
            tourrider_latestEtappeNumber: rider.latestEtappe ? rider.latestEtappe.etappeNumber : null,
            tourrider_isJongeren: rider.isYoungster,
            rider_firstName: rider.rider.firstName,
            rider_firstNameShort: rider.rider.firstNameShort,
            rider_initials: rider.rider.initials,
            rider_surName: rider.rider.surName,
            rider_nationality: rider.rider.nationality,
            rider_surNameShort: rider.rider.surNameShort,
            rider_dateOfBirth: rider.rider.dateOfBirth,
            rider_isActive: true,
            latestEtappeNumber: rider.latestEtappe ? rider.latestEtappe.etappeNumber : null,
            etappepunten: rider.totalStagePoints ? rider.totalStagePoints : 0,
            deltaEtappepunten: rider.deltaStagePoints ? rider.deltaStagePoints : 0,
            algemeenpunten: rider.tourPoints ? rider.tourPoints : 0,
            puntenpunten: rider.pointsPoints ? rider.pointsPoints : 0,
            bergpunten: rider.mountainPoints ? rider.mountainPoints : 0,
            jongerenpunten: rider.youthPoints ? rider.youthPoints : 0,
            totaalpunten: this.determineTotaalpunten(rider),
            gekozenTotaal: rider.predictions ? rider.predictions.length : 0,
            gekozenRenner: rider.predictions ? rider.predictions.filter(p => p.isRider).length : 0,
            gekozenLinkebal: rider.predictions ? rider.predictions.filter(p => p.isLinkebal).length : 0,
            gekozenBeschermderenner: rider.predictions ? rider.predictions.filter(p => p.isBeschermdeRenner).length : 0,
            gekozenWaterdrager: rider.predictions ? rider.predictions.filter(p => p.isWaterdrager).length : 0,
            gekozenMeesterknecht: rider.predictions ? rider.predictions.filter(p => p.isMeesterknecht).length : 0,
        }

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
