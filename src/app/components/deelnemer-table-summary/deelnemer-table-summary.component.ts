import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {UiServiceService} from '../../services/ui-service.service';
import {IRider} from '../../models/rider.model';
import {ITotaalStand} from '../../models/uitslagen.model';

@Component({
    selector: 'app-deelnemer-table-summary',
    templateUrl: './deelnemer-table-summary.component.html',
    styleUrls: ['./deelnemer-table-summary.component.scss'],
})
export class DeelnemerTableSummaryComponent implements OnInit {
    private _line: ITotaalStand;
    private _mainValue: string;

    totaaltruien: number;

    @Input()
    set line(value) {
        this._line = value;
        if (value) {
            this.punten = value[this._mainValue];
        }
    }

    get line(): ITotaalStand {
        return this._line;
    }

    @Input()
    set mainValue(value: string) {
        this._mainValue = value;
        if (this.line) {
            this.punten = this._line[value];
        }
        this.imageUrl = this.uiService.determineImageUrl(value);
    }

    get mainValue(): any {
        return this._mainValue;
    }

    @Input() showDetail: boolean;
    @Input() showDelta = true;
    @Input() showImage = true;
    @Output() itemClickedEvent: EventEmitter<string> = new EventEmitter<string>();

    punten: number;
    imageUrl: string;

    constructor(private router: Router, private uiService: UiServiceService) {
    }

    ngOnInit() {
    }

    itemClicked(line) {
        this.itemClickedEvent.emit(line);
    }
}
