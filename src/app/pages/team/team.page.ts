import {Component, OnInit, ViewChild} from '@angular/core';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {getTour} from '../../store/tour/tour.reducer';
import {ITour} from '../../models/tour.model';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ParticipantService} from '../../services/participant.service';
import {getParticipantPredictions} from '../../store/participanttable/participanttable.reducer';
import {IParticipanttable, Prediction} from '../../models/participanttable.model';
import {IRennerTableSummary} from '../../components/renner-table-summary/renner-table-summary.component';
import {IonSelect, LoadingController} from '@ionic/angular';
import {IParticipant} from '../../models/participant.model';
import {UiServiceService} from '../../services/ui-service.service';

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
                private uiService: UiServiceService,
                private loadingCtrl: LoadingController,
                private router: Router) {

    }

    participantLine: any; // todo
    totalPoints: number;
    position: number;
    mijnTeam: IRennerTableSummary[];
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
                    return this.store.select(getParticipantPredictions(routeParams.id));
                } else {
                    return this.participantService.getParticipant()
                        .pipe(switchMap(user => {
                            return this.store.select(getParticipantPredictions(user.id));
                        }));
                }
            }));
        }))
            .subscribe(participanttable => {
                if (participanttable) {
                    this.participantLine = participanttable;
                    this.mijnTeam = participanttable.predictions.map(prediction => this.mapToRennerTableSummary(prediction));
                    this.sortRenners(this.selectedSort);
                    this.loadingDone = true;
                    loading.dismiss();
                }
            });
    }

    private mapToRennerTableSummary(line: Prediction): IRennerTableSummary {
        console.log('mapToRennerTableSummary: ');
        console.log(line);
        return {
            id: line.id,
            rider: {
                id: line.rider.id,
                firstName: line.rider.rider.firstName,
                surName: line.rider.rider.surName,
                surNameShort: line.rider.rider.surNameShort,
                initials: line.rider.rider.initials,
                isOut: line.rider.isOut,
                nationality: line.rider.rider.nationality,
                isBeschermdeRenner: line.isBeschermdeRenner,
                isLinkebal: line.isLinkebal,
                isMeesterknecht: line.isMeesterknecht,
                isRider: line.isRider,
                isWaterdrager: line.isWaterdrager,
                waarde: line.rider.waarde,
                isYoungster: (new Date(this.uiService.tourStartDate).getFullYear() -
                    new Date(line.rider.rider.dateOfBirth).getFullYear()) < 26,
            },
            latestEtappe: line.rider.latestEtappe,
            points: {
                totalPoints: this.determineTotaalpunten(line),
                totalTourPoints: line.tourPoints ? line.tourPoints : 0,
                totalMountainPoints: line.mountainPoints ? line.mountainPoints : 0,
                totalPointsPoints: line.pointsPoints ? line.pointsPoints : 0,
                totalYouthPoints: line.youthPoints ? line.youthPoints : 0,
                totalStagePoints: line.totalStagePoints ? line.totalStagePoints : 0,
                deltaTotalStagePoints: line.deltaStagePoints,
            },
        };
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
                    return b.points.totalPoints - a.points.totalPoints;
                case 'totalTourPoints':
                    return b.points.totalTourPoints - a.points.totalTourPoints;
                case 'waarde':
                    return b.rider.waarde - a.rider.waarde;
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
            }
        });
    }

}
