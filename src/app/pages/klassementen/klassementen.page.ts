import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {ClassificationsService} from '../../services/stageclassifications.service';
import {getTour} from '../../store/tour/tour.reducer';
import {of, Subject, switchMap, takeUntil} from 'rxjs';
import {ALGEMEENKLASSEMENT, BERGKLASSEMENT, JONGERENKLASSEMENT, PUNTENKLASSEMENT} from '../../models/constants';

@Component({
    selector: 'app-klassementen',
    templateUrl: './klassementen.page.html',
    styleUrls: ['./klassementen.page.scss'],
})
export class KlassementenPage implements OnInit, OnDestroy {

    constructor(private stageClassificationsService: ClassificationsService,
                private store: Store<IAppState>) {
    }
    klassementsType = ALGEMEENKLASSEMENT;
    uitslag: any[];
    unsubscribe = new Subject<void>();

    ngOnInit() {
        this.fetchTourClassification();
    }


    private fetchTourClassification() {
        this.store.select(getTour).pipe(switchMap(tour => {
            if (tour && tour.id) {
                return this.stageClassificationsService.getTourClassifications(tour.id);
            } else {
                return of(undefined);
            }
        })).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            if (response) {
                this.uitslag = response.map(rider => {
                    return {
                        ...rider,
                        punten: TOURFACTOR * eval('PUNTEN_POSITIE' + rider.position)
                    };
                });
            }
        });
    }

    private fetchYouthClassification() {
        this.store.select(getTour).pipe(switchMap(tour => {
            if (tour && tour.id) {
                return this.stageClassificationsService.getYouthClassifications(tour.id);
            } else {
                return of(undefined);
            }
        })).subscribe(response => {
            if (response) {
                this.uitslag = response.map(rider => {
                    return {
                        ...rider,
                        punten: YOUTHFACTOR * eval('PUNTEN_POSITIE' + rider.position)
                    };
                });
            }
        });
    }

    private fetchMountainClassification() {
        this.store.select(getTour).pipe(switchMap(tour => {
            if (tour && tour.id) {
                return this.stageClassificationsService.getMountainClassifications(tour.id);
            } else {
                return of(undefined);
            }
        })).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            if (response) {
                this.uitslag = response.map(rider => {
                    return {
                        ...rider,
                        punten: MOUNTAINFACTOR * eval('PUNTEN_POSITIE' + rider.position)
                    };
                });
            }
        });
    }

    private fetchPointsClassification() {
        this.store.select(getTour).pipe(switchMap(tour => {
            if (tour && tour.id) {
                return this.stageClassificationsService.getPointsClassifications(tour.id);
            } else {
                return of(undefined);
            }
        })).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            if (response) {
                this.uitslag = response.map(rider => {
                    return {
                        ...rider,
                        punten: POINTSFACTOR * eval('PUNTEN_POSITIE' + rider.position)
                    };
                });;
            }
        });
    }

    setKlassement(event) {
        switch (event.detail.value) {
            case BERGKLASSEMENT:
                this.fetchMountainClassification();
                break;
            case JONGERENKLASSEMENT:
                this.fetchYouthClassification();
                break;
            case ALGEMEENKLASSEMENT:
                this.fetchTourClassification();
                break;
            case PUNTENKLASSEMENT:
                this.fetchPointsClassification();

                break;
            default:
                console.log('default');
        }
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}

const PUNTEN_POSITIE1 = 60;
const PUNTEN_POSITIE2 = 52;
const PUNTEN_POSITIE3 = 44;
const PUNTEN_POSITIE4 = 38;
const PUNTEN_POSITIE5 = 34;
const PUNTEN_POSITIE6 = 30;
const PUNTEN_POSITIE7 = 28;
const PUNTEN_POSITIE8 = 26;
const PUNTEN_POSITIE9 = 24;
const PUNTEN_POSITIE10 = 22;
const PUNTEN_POSITIE11 = 20;
const PUNTEN_POSITIE12 = 18;
const PUNTEN_POSITIE13 = 16;
const PUNTEN_POSITIE14 = 14;
const PUNTEN_POSITIE15 = 12;
const PUNTEN_POSITIE16 = 10;
const PUNTEN_POSITIE17 = 8;
const PUNTEN_POSITIE18 = 6;
const PUNTEN_POSITIE19 = 4;
const PUNTEN_POSITIE20 = 2;
const PUNTEN_POSITIEUit = -20;
const PUNTEN_POSITIEWD = 0;


const TOURFACTOR = 2.5;
const MOUNTAINFACTOR = 2;
const YOUTHFACTOR = 1.5;
const POINTSFACTOR = 2;
