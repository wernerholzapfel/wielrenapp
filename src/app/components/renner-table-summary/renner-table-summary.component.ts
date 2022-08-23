import {Component, Input, OnInit} from '@angular/core';
import {LatestEtappe} from '../../models/participanttable.model';
import {Router} from '@angular/router';
import {UiServiceService} from '../../services/ui-service.service';
import {ITeamScore} from '../../models/teamscore.model';

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
        isYoungster?: boolean;
    };
    points: {
        totalTourPoints: number;
        totalMountainPoints: number;
        totalPointsPoints: number;
        totalYouthPoints: number;
        totalStagePoints: number;
        deltaTotalStagePoints: number;
        totalPoints?: number;
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

    private _line: ITeamScore;
    private _mainValue: string;

    @Input()
    set line(value) {
        this._line = value;
        if (this.mainValue) {
            this.setValues(this.mainValue, value);
        }
    }

    get line(): ITeamScore {
        return this._line;
    }

    @Input()
    set mainValue(value: string) {
        this._mainValue = value;
        this.imageUrl = this.uiService.determineImageUrl(value);
        if (this.line) {
            this.setValues(value, this.line);
        }
    }

    get mainValue(): any {
        return this._mainValue;
    }

    @Input() showDetail = true;
    @Input() lineType: 'inset';
    @Input() showImage = true;
    @Input() showDelta: boolean;
    punten: number;
    deltaPunten: number;
    imageUrl: string;
    tourHasEnded: boolean;

    constructor(private router: Router, private uiService: UiServiceService) {
    }

    ngOnInit() {
    }

    openRenner() {
        this.router.navigate(['/tabs/renner-detail', {id: this.line.tourrider_id}], {state: this.line});
    }

    setValues(mainValue: string, line: ITeamScore) {
        if (line) {
            this.punten = this.uiService.determineDeelnemerPunten(this._line, mainValue);
            if (mainValue === 'gekozen') {
                this.punten = -99; // todo
            } else {
                this.deltaPunten = -99; // todo
            }
        }
    }
}
