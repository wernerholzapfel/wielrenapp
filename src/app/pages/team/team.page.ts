import {Component, OnInit, ViewChild} from '@angular/core';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {getTour} from '../../store/tour/tour.reducer';
import {ITour} from '../../models/tour.model';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ParticipantService} from '../../services/participant.service';
import {getParticipantTotaalStandRecord} from '../../store/participanttable/participanttable.reducer';
import {IParticipanttable, Prediction} from '../../models/participanttable.model';
import {IRennerTableSummary} from '../../components/renner-table-summary/renner-table-summary.component';
import {IonSelect, LoadingController} from '@ionic/angular';
import {IParticipant} from '../../models/participant.model';
import {UiServiceService} from '../../services/ui-service.service';
import {PredictionService} from '../../services/prediction.service';
import {ITeamScore} from '../../models/teamscore.model';

@Component({
    selector: 'app-team',
    templateUrl: './team.page.html',
    styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

    @ViewChild('selectsort') selectsortRef: IonSelect;

    constructor(private store: Store<IAppState>,
                private route: ActivatedRoute,
                private participantService: ParticipantService,
                private predictionService: PredictionService,
                private uiService: UiServiceService,
                private loadingCtrl: LoadingController,
                private router: Router) {

    }

    participantLine: any; // todo
    totalPoints: number;
    position: number;
    mijnTeam: ITeamScore[];
    tour: ITour;
    selectedSort = 'totalPoints';
    showDetail: boolean;
    loadingDone = false;

    async ngOnInit() {
        const loading = await this.loadingCtrl.create({
            message: 'Gegevens ophalen...',
            spinner: 'circles'
        });

        loading.present();
        this.store.select(getTour).pipe(switchMap(tour => {
            this.tour = tour;
            return this.route.params.pipe(switchMap(routeParams => {
                if (routeParams.id) {
                    return this.predictionService.getTeamWithScoreForUser(tour.id, routeParams.id);
                } else {
                    return this.participantService.getParticipant()
                        .pipe(switchMap(user => {
                            return this.predictionService.getTeamWithScoreForUser(tour.id, user.id);
                        }));
                }
            }));
        }))
            .subscribe(teamscore => {
                if (teamscore) {
                    this.mijnTeam = teamscore.map(line => {
                        return {
                            ...line,
                            tourrider_isJongeren: (new Date(this.uiService.tourStartDate).getFullYear() -
                                new Date(line.rider_dateOfBirth).getFullYear()) < 26
                        };
                    });
                    this.sortRenners(this.selectedSort);
                    this.loadingDone = true;
                    loading.dismiss();
                }
            });

        this.store.select(getTour).pipe(switchMap(tour => {
            this.tour = tour;
            return this.route.params.pipe(switchMap(routeParams => {
                if (routeParams.id) {
                    return this.predictionService.getTotaalStandForParticipant(tour.id, routeParams.id);
                } else {
                    return this.participantService.getParticipant()
                        .pipe(switchMap(user => {
                            return this.predictionService.getTotaalStandForParticipant(tour.id, user.id);
                        }));
                }
            }));
        }))
            .subscribe(participantLine => {
                if (participantLine) {
                    this.participantLine = participantLine;
                    this.loadingDone = true;
                    loading.dismiss();
                }
            });
    }

    determineTotaalpunten(line: Prediction): number {
        console.log('determineTotaalpunten: ' + line.id);
        if (this.tour.hasEnded) {
            return ((line.totalStagePoints ? line.totalStagePoints : 0) +
                (line.youthPoints ? line.youthPoints : 0) +
                (line.mountainPoints ? line.mountainPoints : 0) +
                (line.tourPoints ? line.tourPoints : 0) +
                (line.pointsPoints ? line.pointsPoints : 0));
        } else {
            return line.totalStagePoints ? line.totalStagePoints : 0;

        }
    }

    openSelectSort() {
        this.selectsortRef.open();
    }

    sortRenners(sort: string) {
        this.selectedSort = sort === 'waarde' ? this.selectedSort : sort;
        this.mijnTeam = this.mijnTeam.slice().sort((a, b) => {
            switch (sort) {
                case 'totalPoints':
                    return b.totaalpunten - a.totaalpunten;
                case 'totalTourPoints':
                    return b.algemeenpunten - a.algemeenpunten;
                case 'waarde':
                    return b.tourrider_waarde - a.tourrider_waarde;
                case 'totalMountainPoints':
                    return b.bergpunten - a.bergpunten;
                case 'totalPointsPoints':
                    return b.puntenpunten - a.puntenpunten;
                case 'totalYouthPoints':
                    return b.jongerenpunten - a.jongerenpunten;
                case 'totalStagePoints':
                    return b.etappepunten - a.etappepunten;
                case 'deltaTotalStagePoints':
                    return; // todo toevoegen in backend
            }
        });
    }

    openDeelnemer(line) {
        this.router.navigate(['/tabs/team', {id: line.id}], {state: line});
    }
}
