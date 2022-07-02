import {Component, Input, OnInit} from '@angular/core';
import {LatestEtappe} from '../../models/participanttable.model';
import {Router} from '@angular/router';

export interface IRennerTableSummary {
    id: string;
    rider: {
        id: string;
        nationality: string;
        firstName: string;
        initials: string;
        surNameShort: string;
        surName: string;
        isOut: boolean;
        isRider?: boolean;
        isWaterdrager?: boolean;
        isMeesterknecht?: boolean;
        isLinkebal?: boolean;
        isBeschermdeRenner?: boolean;
        waarde: number;
    };
    points: {
        totalTourPoints: number;
        totalMountainPoints: number;
        totalPointsPoints: number;
        totalYouthPoints: number;
        totalStagePoints: number;
        deltaTotalStagePoints: number;
    };
    latestEtappe: LatestEtappe;
    gekozen?: number;
}

@Component({
    selector: 'app-renner-table-summary',
    templateUrl: './renner-table-summary.component.html',
    styleUrls: ['./renner-table-summary.component.scss'],
})

export class RennerTableSummaryComponent implements OnInit {

    @Input() line: IRennerTableSummary;
    @Input() riderId: string;
    @Input() showDetail = true;
    @Input() mainValue: string;
    @Input() lineType: 'inset';
    icon: string;
    constructor(private router: Router) {
    }

    ngOnInit() {
            this.icon = this.line.rider.isBeschermdeRenner ? 'beschermderenner_black' :
            this.line.rider.isWaterdrager ? 'waterdrager_black' :
            this.line.rider.isMeesterknecht ? 'meesterknecht_black' :
            this.line.rider.isLinkebal ? 'joker_black' : 'rider_black';
    }
    openRenner() {
        console.log(this.line);
        this.router.navigate(['/tabs/renner-detail', { id: this.riderId }], {state: this.line});
    }
}
