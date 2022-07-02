import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {ActivatedRoute, Router} from '@angular/router';
import {ParticipantService} from '../../services/participant.service';
import {IRider} from '../../models/rider.model';
import {ITourriders} from '../../models/tourriders.model';
import {IRennerTableSummary} from '../../components/renner-table-summary/renner-table-summary.component';
import {getTour} from '../../store/tour/tour.reducer';
import {Subject, takeUntil} from 'rxjs';
import {ITour} from '../../models/tour.model';
import {RiderService} from '../../services/rider.service';
import {IParticipant, IPrediction} from '../../models/participant.model';
import {IStageClassification} from '../../models/etappe.model';

@Component({
    selector: 'app-renner-detail',
    templateUrl: './renner-detail.page.html',
    styleUrls: ['./renner-detail.page.scss'],
})
export class RennerDetailPage implements OnInit {

    constructor(private store: Store<IAppState>,
                private route: ActivatedRoute,
                private participantService: ParticipantService,
                private riderService: RiderService,
                private router: Router) {
    }

    rider: IRider;
    chosenRiderStats: any;
    predictions: IPrediction[];
    activePredictions: IPrediction[];
    stageclassifications: IStageClassification[];
    rennerTableSummary: IRennerTableSummary;
    unsubscribe = new Subject<void>();
    activeSegment = 'gekozen';
    headerDisplayname = 'Renner';

    ngOnInit() {
        this.rennerTableSummary = history.state;
        console.log(this.router.getCurrentNavigation().extras.state);
        this.route.params.pipe(takeUntil(this.unsubscribe)).subscribe(routeParams => {
            if (routeParams.id) {
                this.riderService.getTourriderDetails(routeParams.id)
                    .subscribe(tourrider => {
                        if (tourrider) {
                            this.rider = tourrider.rider;
                            this.stageclassifications = tourrider.stageclassifications;
                            this.predictions = tourrider.predictions;
                            this.chosenRiderStats = [
                                {
                                    type: 'rider',
                                    predictions: this.predictions.filter(p => p.isRider),
                                    icon: 'rider.svg',
                                    active: true,
                                    displayName: 'renner',
                                }, {
                                    type: 'linkebal',
                                    predictions: this.predictions.filter(p => p.isLinkebal),
                                    icon: 'joker.svg',
                                    active: false,
                                    displayName: 'joker',
                                }, {
                                    type: 'beschermdeRenner',
                                    predictions: this.predictions.filter(p => p.isBeschermdeRenner),
                                    icon: 'beschermde_renner.svg',
                                    active: false,
                                    displayName: 'beschermde renner',
                                }, {
                                    type: 'waterdrager',
                                    predictions: this.predictions.filter(p => p.isWaterdrager),
                                    icon: 'waterdrager.svg',
                                    active: false,
                                    displayName: 'waterdrager',
                                }, {
                                    type: 'meesterknecht',
                                    predictions: this.predictions.filter(p => p.isMeesterknecht),
                                    icon: 'meesterknecht.svg',
                                    active: false,
                                    displayName: 'meesterknecht',
                                }].filter(p => p.predictions.length > 0);

                            this.setRiderStats(0);
                        }
                    });
            }
        });
    }

    segmentChanged($event) {
        this.activeSegment = $event.detail.value;
    }

    setRiderStats(index) {
        this.chosenRiderStats = this.chosenRiderStats.map((riderStats, i) => {
            return {
                ...riderStats,
                active: index === i
            };
        });
        this.activePredictions = this.chosenRiderStats[index].predictions;
        this.headerDisplayname = this.chosenRiderStats[index].displayName;
    }

    openDeelnemer(deelnemer: IParticipant) {
        this.router.navigate(['/tabs/team', {id: deelnemer.id}], {state: deelnemer});
    }
}
