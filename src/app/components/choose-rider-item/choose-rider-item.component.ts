import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPrediction} from '../../models/participant.model';

@Component({
    selector: 'app-choose-rider-item',
    templateUrl: './choose-rider-item.component.html',
    styleUrls: ['./choose-rider-item.component.scss'],
})
export class ChooseRiderItemComponent implements OnInit {

    @Input() rider: IPrediction;
    @Input() icon = 'bicycle';
    @Input() title = 'Kies renner';
    @Output() deleteRiderEvent: EventEmitter<IPrediction> = new EventEmitter<IPrediction>();
    @Output() openRiderEvent: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
    }

    deleteRider(rider: IPrediction) {
        this.deleteRiderEvent.emit(rider);
    }

    openRidersPopup(index: number) {
        this.openRiderEvent.emit(index);
    }

}
