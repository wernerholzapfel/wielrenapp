import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {UiServiceService} from '../../services/ui-service.service';

@Component({
    selector: 'app-deelnemer-table-summary',
    templateUrl: './deelnemer-table-summary.component.html',
    styleUrls: ['./deelnemer-table-summary.component.scss'],
})
export class DeelnemerTableSummaryComponent implements OnInit {
    private _line: any;
    private _mainValue: string;

    @Input()
    set line(value) {
        this._line = value;
        this.punten = this.uiService.determineDeelnemerPunten(value, this._mainValue);
    }

    get line(): any {
        return this._line;
    }

    @Input()
    set mainValue(value: string) {
        this._mainValue = value;
        if (this.line) {
            this.punten = this.uiService.determineDeelnemerPunten(this._line, value);
        }
        this.imageUrl = this.uiService.determineImageUrl(value);
    }

    get mainValue(): any {
        return this._mainValue;
    }

    @Input() showDetail: boolean;
    @Input() showDelta: boolean;
    @Input() showImage = false;
    punten: number;
    imageUrl: string;

    constructor(private router: Router, private uiService: UiServiceService) {
    }

    ngOnInit() {
        if (this.line && this.mainValue) {
        }
    }

    openDeelnemer(deelnemerId) {
        this.router.navigate(['/tabs/team', {id: deelnemerId}], {state: this.line});
    }
}
