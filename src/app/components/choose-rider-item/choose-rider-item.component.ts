import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPrediction} from '../../models/participant.model';
import {ITour} from '../../models/tour.model';
import {UiServiceService} from '../../services/ui-service.service';

@Component({
    selector: 'app-choose-rider-item',
    templateUrl: './choose-rider-item.component.html',
    styleUrls: ['./choose-rider-item.component.scss'],
})
export class ChooseRiderItemComponent implements OnInit {

    @Input() rider: IPrediction;
    @Input() icon = 'bicycle';
    @Input() title = 'Kies renner';
    @Input() tour: ITour;
    @Output() deleteRiderEvent: EventEmitter<IPrediction> = new EventEmitter<IPrediction>();
    @Output() openRiderEvent: EventEmitter<number> = new EventEmitter<number>();

    isYoungster: boolean;
    constructor(private uiService: UiServiceService) {
    }

    ngOnInit() {
        if (this.rider && this.rider.id) {
            const tourYear = new Date(this.uiService.tourStartDate).getFullYear();
            const birthYear = new Date(this.rider?.rider?.rider?.dateOfBirth).getFullYear();
            this.isYoungster = birthYear && (tourYear - birthYear) < 26;
        }
    }

    deleteRider(rider: IPrediction) {
        this.deleteRiderEvent.emit(rider);
    }

    openRidersPopup(index: number) {
        this.openRiderEvent.emit(index);
    }

}
