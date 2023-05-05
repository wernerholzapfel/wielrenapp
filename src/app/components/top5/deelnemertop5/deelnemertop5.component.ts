import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IParticipanttable} from '../../../models/participanttable.model';
import {IAppState} from '../../../store/store';
import {select, Store} from '@ngrx/store';
import {getLastUpdated} from '../../../store/participanttable/participanttable.reducer';
import {getParticipant} from '../../../store/participant/participant.reducer';
import {IEtappeStand, ITotaalStand} from '../../../models/uitslagen.model';
import {UiServiceService} from '../../../services/ui-service.service';
import {getTour} from '../../../store/tour/tour.reducer';
import { Router } from '@angular/router';

@Component({
    selector: 'app-deelnemertop5',
    templateUrl: './deelnemertop5.component.html',
    styleUrls: ['./deelnemertop5.component.scss']
})
export class Deelnemertop5Component implements OnInit {

    constructor(private store: Store<IAppState>, private uiService: UiServiceService, private router: Router) {
    }

    private _participantPrediction: ITotaalStand | IEtappeStand;

    @Input() top: number;
    @Input() puntenproperty: string;
    @Input() stand$: Observable<ITotaalStand[] | IEtappeStand[]>;
    @Input() isRegistrationOpen$: Observable<boolean>;
    @Input() lastUpdated: string;
    @Input() title: string;

    @Input()
    set participantPrediction(value) {
        this._participantPrediction = value;
    }

    get participantPrediction() {
        return this._participantPrediction;
    }
    participantId: string;

    ngOnInit() {
        this.store.pipe(select(getParticipant)).subscribe(participant => {
            if (participant) {
                this.participantId = participant.id;
            }
        });
    }
    openDeelnemer(line) {
        this.router.navigate(['/tabs/team', {id: line.id}], {state: line});
    }
}
