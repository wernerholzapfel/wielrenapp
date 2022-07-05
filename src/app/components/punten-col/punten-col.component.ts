import {Component, Input, OnInit} from '@angular/core';
import {IRennerTableSummary} from '../renner-table-summary/renner-table-summary.component';

@Component({
    selector: 'app-punten-col',
    templateUrl: './punten-col.component.html',
    styleUrls: ['./punten-col.component.scss'],
})
export class PuntenColComponent implements OnInit {
    private _imageUrl: string;

    @Input()
    set imageUrl(value) {
        this._imageUrl = value;
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    private _punten: number;

    @Input()
    set punten(value) {
        this._punten = value;
    }

    get punten(): number {
        return this._punten;
    }

    @Input() deltaPunten: number;
    @Input() showDelta = true;
    @Input() showImage = false;

    constructor() {
    }

    ngOnInit() {
    }

}
