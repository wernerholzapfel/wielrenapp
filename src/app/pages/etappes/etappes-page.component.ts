import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as dayjs from 'dayjs';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import * as weekYear from 'dayjs/plugin/weekYear';
import * as calendar from 'dayjs/plugin/calendar';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import * as weekday from 'dayjs/plugin/weekday';
import { select, Store } from '@ngrx/store';
import { getEtappes, getLatestEtappe } from '../../store/etappe/etappe.reducer';
import { distinctUntilChanged, mergeMap, takeUntil } from 'rxjs/operators';
import { IEtappe, IStageClassification } from '../../models/etappe.model';
import { combineLatest, Subject, zip } from 'rxjs';
import { ClassificationsService } from '../../services/stageclassifications.service';
import { getTour } from '../../store/tour/tour.reducer';
import { TourService } from '../../services/tour.service';
import { IParticipanttable } from '../../models/participanttable.model';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { TableSettingsComponent } from '../../components/table-settings/table-settings.component';
import { IAppState } from '../../store/store';
// import SwiperCore, {SwiperOptions, A11y} from 'swiper';
// import {SwiperSlide} from 'swiper/svelte/swiper-svelte';
// import {SwiperComponent} from 'swiper/angular';
import { Router } from '@angular/router';
import { EtappeUitslagComponent } from '../../components/etappe-uitslag/etappe-uitslag.component';
import { PredictionService } from 'src/app/services/prediction.service';
import { IonicSlides } from '@ionic/angular';
import Swiper from 'swiper';

// SwiperCore.use([A11y]);

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

    @ViewChild('swiperRef')
    swiperRef: ElementRef | undefined;
    public activeSegment = 'stand';
    public activeEtappe: IEtappe;
    public etappeIndex: number;
    public tourId: string;
    public etappes: IEtappe[];
    public uitslag: IStageClassification[];
    public stand: IParticipanttable[];
    unsubscribe = new Subject<void>();
    presentingElement = null;

    constructor(private store: Store<IAppState>,
        private predictionService: PredictionService,
        private classificationsService: ClassificationsService,
        private tourService: TourService,
        private modalCtrl: ModalController,
        private router: Router,
        private modalController: ModalController,
        private routerOutlet: IonRouterOutlet) {
    }

    ngOnInit() {

        combineLatest([this.store.pipe(select(getTour)),
        this.store.select(getEtappes)])
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([tour, etappes]) => {
                if (etappes && etappes.length > 0) {
                    this.tourId = tour.id;
                    this.etappes = etappes;
                    const latestDrivenEtappe = etappes.filter(etappe => etappe.isDriven)
                    const latestEtappe = latestDrivenEtappe ? latestDrivenEtappe[latestDrivenEtappe.length - 1] : this.etappes[0]
                    this.etappeIndex = etappes.indexOf(latestEtappe)
                    if (this.etappeIndex > 0) {
                        this.setEtappe(etappes[this.etappeIndex], this.etappeIndex);
                    }
                }
            });

    }
    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    setEtappe(etappe: IEtappe, index: number) {
        this.stand = [];
        this.uitslag = [];
        this.activeEtappe = etappe;
        this.etappeIndex = index;
        this.classificationsService.getStageClassifications(etappe.id)
            .subscribe(response => {
                this.swiperRef?.nativeElement.swiper?.slideTo(this.etappeIndex);
                this.uitslag = response.map(item => {
                    return {
                        ...item,
                        punten: this.calculatePoints(item.position)
                    };
                });
            });

        this.predictionService.getStandForEtappe(this.activeEtappe.id)
            .subscribe(response => {
                this.stand = response
            });
    }

    segmentChanged($event) {
        this.activeSegment = $event.detail.value;
    }

    calculatePoints(position: number) {
        return eval('etappe' + position);
    }
    async openDeelnemer(line) {
        const modal = await this.modalCtrl.create({
            component: EtappeUitslagComponent,
            componentProps: {
                uitslag: this.uitslag,
                participant: line,
                selectedEtappe: this.activeEtappe
            },
            swipeToClose: true,
            // initialBreakpoint: 0.9,
            // breakpoints: [0]
        });
        modal.present();

        const { data, role } = await modal.onWillDismiss();

    }
    onSlideChange() {
        console.log('hoi')
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
