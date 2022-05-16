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
import {IonSelect} from '@ionic/angular';
import {IParticipant} from '../../models/participant.model';

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
                private router: Router) {
    }

    title: string;
    mijnTeam: IRennerTableSummary[];
    tour: ITour;
    selectedSort = 'totalTourPoints';
    showDetail: boolean;

    ngOnInit() {
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
                    this.title = participanttable.teamName;
                    console.log(participanttable);
                    this.mijnTeam = participanttable.predictions.map(prediction => this.mapToRennerTableSummary(prediction));
                    this.sortRenners(this.selectedSort);
                }
            });
    }

    private mapToRennerTableSummary(line: Prediction): IRennerTableSummary {
        return {
            rider: {
                id: line.rider.id,
                firstName: line.rider.rider.firstName,
                surName: line.rider.rider.surName,
                isOut: line.rider.isOut,
                nationality: line.rider.rider.nationality,
                isBeschermdeRenner: line.isBeschermdeRenner,
                isLinkebal: line.isLinkebal,
                isMeesterknecht: line.isMeesterknecht,
                isRider: line.isRider,
                isWaterdrager: line.isWaterdrager,
                waarde: line.rider.waarde
            },
            latestEtappe: line.rider.latestEtappe,
            points: {
                totalTourPoints: this.determineTotaalpunten(line),
                totalMountainPoints: line.mountainPoints ?  line.mountainPoints : 0,
                totalPointsPoints: line.pointsPoints ?  line.pointsPoints : 0,
                totalYouthPoints: line.youthPoints ?  line.youthPoints : 0,
                totalStagePoints: line.totalStagePoints ?  line.totalStagePoints : 0,
                deltaTotalStagePoints: line.deltaStagePoints,
            },
        };
    }

    determineTotaalpunten(line: Prediction): number {
        if (this.mijnTeam && false) {
            return ((line.totalStagePoints ? line.totalStagePoints : 0) +
                (line.youthPoints ? line.youthPoints : 0) +
                (line.mountainPoints ? line.mountainPoints : 0) +
                (line.pointsPoints ? line.pointsPoints : 0));
        } else {
            return line.totalStagePoints ? line.totalStagePoints : 0;

        }
    }
    openSelectSort() {
        this.selectsortRef.open();
    }
    sortRenners(sort: string) {
        this.selectedSort = sort;
        this.mijnTeam = this.mijnTeam.slice().sort((a, b) => {
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
            }
        });
    }
}
