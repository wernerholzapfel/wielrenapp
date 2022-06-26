import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getTour} from '../../store/tour/tour.reducer';
import {takeUntil} from 'rxjs/operators';
import {ITour} from '../../models/tour.model';
import {IRennerTableSummary} from '../../components/renner-table-summary/renner-table-summary.component';
import {Subject} from 'rxjs';
import {RiderService} from '../../services/rider.service';
import {IAppState} from '../../store/store';
import {IRider} from '../../models/rider.model';
import {ITourriders} from '../../models/tourriders.model';
import {ModalController} from '@ionic/angular';
import {ITeam} from '../../models/team.model';
import {UiServiceService} from '../../services/ui-service.service';

@Component({
    selector: 'app-choose-rider',
    templateUrl: './choose-rider.page.html',
    styleUrls: ['./choose-rider.page.scss'],
})
export class ChooseRiderPage implements OnInit {

    @Input() ridersWaardeList: any[];
    @Input() teams: ITeam[];
    @Input() predictionType: string;
    @Input() beschermdeRennerMeesterKnechtWaarde: number;
    selectedSegment = 'teamlijst';
    showDetail = false;
    searchTerm: string;
    tour: ITour;
    unsubscribe = new Subject<void>();
    title = 'Kies Renner';


    constructor(
        private riderService: RiderService,
        private uiService: UiServiceService,
        private store: Store<IAppState>,
        private modalController: ModalController) {
    }

    ngOnInit() {
        switch (this.predictionType) {
            case 'beschermderenner' :
                this.title = 'Kies Beschermde renner';
                if (this.beschermdeRennerMeesterKnechtWaarde > 0) {
                    this.filterRennersBijWaarde(this.beschermdeRennerMeesterKnechtWaarde);
                }

                break;
            case 'linkebal' :
                this.title = 'Kies Joker';
                this.filterRennersBijWaarde(10);
                break;
            case 'waterdrager' :
                this.title = 'Kies Waterdrager';
                break;
            case 'meesterknecht' :
                this.title = 'Kies Meesterknecht';
                if (this.beschermdeRennerMeesterKnechtWaarde > 0) {
                    this.filterRennersBijWaarde(this.beschermdeRennerMeesterKnechtWaarde);
                }
                break;
            default:
                this.title = 'Kies Renner';
                break;
        }
        console.log(this.ridersWaardeList);
    }

    segmentChanged(ev: string) {
        console.log('Segment changed', ev);
        this.selectedSegment = ev;
    }

    selectRider(rider: ITourriders) {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            rider,
            predictionType: this.predictionType
        });
    }

    search(searchTerm: any) {
     console.log(this.uiService.filterRenners(searchTerm.detail.value, this.teams));
    }

    filterRennersBijWaarde(waarde: number) {
        this.teams = this.teams.map(team => {
            return {
                ...team,
                tourRiders: [...team.tourRiders].filter(tr => tr.waarde === waarde)
            };
        });
        this.ridersWaardeList = this.ridersWaardeList.filter(rwl => rwl.waarde === waarde);
    };
}
