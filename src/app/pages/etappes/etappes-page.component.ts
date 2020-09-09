import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import * as dayjs from 'dayjs';
import * as localeData from 'dayjs/plugin/localeData';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import * as weekYear from 'dayjs/plugin/weekYear';
import * as calendar from 'dayjs/plugin/calendar';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import * as weekday from 'dayjs/plugin/weekday';
import {endOfWeek, startOfWeek} from 'date-fns';
import {IAppState} from '../../store/store';
import {select, Store} from '@ngrx/store';
import {AppState} from '@capacitor/core';
import {getEtappes, getLatestEtappe} from '../../store/etappe/etappe.reducer';
import {distinctUntilChanged, mergeMap, takeUntil} from 'rxjs/operators';
import {IEtappe, IStageClassification} from '../../models/etappe.model';
import {Subject} from 'rxjs';
import {ClassificationsService} from '../../services/stageclassifications.service';
import {getTour} from '../../store/tour/tour.reducer';
import {TourService} from '../../services/tour.service';
import {IParticipanttable} from '../../models/participanttable.model';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {TableSettingsComponent} from '../../components/table-settings/table-settings.component';

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(weekday);
dayjs.extend(calendar);
dayjs.extend(isoWeek);

@Component({
    selector: 'app-tab1',
    templateUrl: 'etappes-page.component.html',
    styleUrls: ['etappes-page.component.scss']
})
export class EtappesPage implements OnInit, OnDestroy {

    public activeSegment = 'uitslag';
    public activeEtappe: IEtappe;
    public etappeIndex: number;
    public tourId: string;
    public etappes: IEtappe[];
    public uitslag: IStageClassification[];
    public stand: IParticipanttable[];
    unsubscribe = new Subject<void>();

    constructor(private store: Store<AppState>,
                private classificationsService: ClassificationsService,
                private tourService: TourService,
                private modalController: ModalController,
                private routerOutlet: IonRouterOutlet) {
    }

    config: SwiperConfigInterface = {
        a11y: true,
        direction: 'horizontal',
        slidesPerView: 7,
        centeredSlides: true,
        // slideToClickedSlide: true,
        // mousewheel: true,
        // scrollbar: false,
        watchSlidesProgress: true,
        // pagination: false,
        loop: false,
        // roundLengths: true,
        initialSlide: 0
    };

    ngOnInit() {
        this.store.select(getEtappes)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(etappes => {
                if (etappes && etappes.length > 0) {
                    this.etappes = etappes;
                    this.etappeIndex = etappes.filter(etappe => etappe.isDriven).length - 1;

                    this.setEtappe(etappes[this.etappeIndex], this.etappeIndex);
                }
            });

        this.store.pipe(select(getTour))
            .pipe(distinctUntilChanged(),
                takeUntil(this.unsubscribe))
            .subscribe(tour => {
                if (tour && tour.id) {
                    this.tourId = tour.id;
                }
            });

    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    setEtappe(etappe: IEtappe, index: number) {
        this.activeEtappe = etappe;
        this.etappeIndex = index;
        this.classificationsService.getStageClassifications(etappe.id)
            .subscribe(response => {
                this.uitslag = response.map(item => {
                    return {
                        ...item,
                        punten: this.calculatePoints(item.position)
                    };
                });
            });

        this.tourService.getEtappeStand(this.tourId, this.activeEtappe.id)
            .subscribe(response => {
                this.stand = response;
            });
    }

    segmentChanged($event) {
        this.activeSegment = $event.detail.value;
    }

    openSettings(): Promise<any> {
        return this.modalController.create({
            component: TableSettingsComponent,
            swipeToClose: true,
            presentingElement: (this.routerOutlet.parentOutlet.nativeEl)
        }).then(modal => {
            modal.onDidDismiss().then((event: any) => {
            });
            return modal.present();
        });
    }

    calculatePoints(position: number) {
            return eval('etappe' + position);
    }
}


const etappe1 = 60;
const etappe2 = 52;
const etappe3 = 44;
const etappe4 = 38;
const etappe5 = 34;
const etappe6 = 30;
const etappe7 = 28;
const etappe8 = 26;
const etappe9 = 24;
const etappe10 = 22;
const etappe11 = 20;
const etappe12 = 18;
const etappe13 = 16;
const etappe14 = 14;
const etappe15 = 12;
const etappe16 = 10;
const etappe17 = 8;
const etappe18 = 6;
const etappe19 = 4;
const etappe20 = 2;
const etappeUit = -20;
const etappeWD = 0;
