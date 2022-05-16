import {Component, Input, OnInit} from '@angular/core';
import {LatestEtappe} from '../../models/participanttable.model';

export interface IRennerTableSummary {
    rider: {
        id: string
        nationality: string
        firstName: string
        surName: string
        isOut: boolean
        isRider?: boolean;
        isWaterdrager?: boolean;
        isMeesterknecht?: boolean;
        isLinkebal?: boolean;
        isBeschermdeRenner?: boolean;
        waarde: number
    };
    points: {
        totalTourPoints: number
        totalMountainPoints: number
        totalPointsPoints: number
        totalYouthPoints: number
        totalStagePoints: number
        deltaTotalStagePoints: number
    };
    latestEtappe: LatestEtappe;
    gekozen?: number
}

@Component({
    selector: 'app-renner-table-summary',
    templateUrl: './renner-table-summary.component.html',
    styleUrls: ['./renner-table-summary.component.scss'],
})

export class RennerTableSummaryComponent implements OnInit {

    @Input() line: IRennerTableSummary;
    @Input() showDetail = true;
    @Input() mainValue: string;

    constructor() {
    }

    ngOnInit() {
    }

}
