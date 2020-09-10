import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ITourriders} from '../../models/tourriders.model';
import {IRider} from '../../models/rider.model';
import {IAppState} from '../../store/store';
import {RiderService} from '../../services/rider.service';
import {Store} from '@ngrx/store';
import {FetchRiders} from '../../store/rider/rider.actions';
import {getTourriders} from '../../store/tourriders/tourrider.reducer';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-renners',
    templateUrl: './renners.page.html',
    styleUrls: ['./renners.page.scss'],
})
export class RennersPage implements OnInit, OnDestroy {

    searchTerm: string;
    riders: ITourriders[];
    unsubscribe = new Subject<void>();

    @Output() addPositionEvent: EventEmitter<IRider> = new EventEmitter<IRider>();

    constructor(private riderService: RiderService, private store: Store<IAppState>) {
    }

    /**
     * Set the sort after the view init since this component will
     * be able to query its view for the initialized sort.
     */

    ngOnInit() {
        this.store.dispatch(new FetchRiders());
        this.store.select(getTourriders)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(riders => {
                if (riders) {
                    this.riders = riders.slice().sort(((a, b) => {
                        return b.totalStagePoints - a.totalStagePoints;
                    }));
                }
            });
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    // addPosition(element: any) {
    //   if (element.type === 'cellValueChanged' && element.colDef.field === 'rider.position') {
    //     const updatedRider = Object.assign(element.data.rider, {position: element.newValue, id: element.data.id});
    //     this.addPositionEvent.emit(updatedRider);
    //   }
    // }
}
