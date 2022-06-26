import {Component, OnDestroy, OnInit} from '@angular/core';
import {IPartipantRidersFormModel} from '../../models/partipantRidersForm.model';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {PredictionService} from '../../services/prediction.service';
import {ParticipantService} from '../../services/participant.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {ITeam} from '../../models/team.model';
import {ITour} from '../../models/tour.model';
import {getParticipantforms} from '../../store/participantform/participantform.reducer';
import {getTour, getTourTeams, isRegistrationOpen} from '../../store/tour/tour.reducer';
import {takeUntil} from 'rxjs/operators';
import {IPrediction, ITourrider} from '../../models/participant.model';
import {UiServiceService} from '../../services/ui-service.service';
import * as fromTour from '../../store/tour/tour.actions';
import * as fromParticipantForm from '../../store/participantform/participantform.actions';
import {AddRiderToForm} from '../../store/participantform/participantform.actions';
import {ModalController} from '@ionic/angular';
import {ChooseRiderPage} from '../choose-rider/choose-rider.page';

@Component({
    selector: 'app-subscribe',
    templateUrl: './subscribe.page.html',
    styleUrls: ['./subscribe.page.scss'],
})
export class SubscribePage implements OnInit, OnDestroy {

    tour$: Observable<ITour>;
    tour: ITour;
    teams$: Observable<ITeam[]>;
    teams: ITeam[];
    participantsForm$: Observable<any[]>;
    isRegistrationOpen$: Observable<boolean>;
    currentRider: any; // todo
    currentTeam: ITeam;
    partipantRidersForm: IPartipantRidersFormModel;
    maxParticipantRiders = 11;
    maxParticipantRidersPunten = 800;
    calculatedWaardepunten = 0;
    isParticitantRidersComplete = false;
    laagsteWaardegroep = 10;
    newWaardeList: any[];
    isLoading: boolean;
    init: Subscription;
    isRegistrationOpen: boolean;
    unsubscribe = new Subject<void>();
    beschermdeRennerMeesterKnechtWaarde: number;

    constructor(private store: Store<IAppState>,
                private predictionService: PredictionService,
                private participantService: ParticipantService,
                private modalController: ModalController,
                private uiService: UiServiceService) {
    }

    ngOnInit() {
        this.store.dispatch(new fromParticipantForm.FetchParticipantform('ad756953-cb34-48bb-bbea-4dd52b993598'));

        this.participantsForm$ = this.store.select(getParticipantforms);


        this.participantsForm$.subscribe(response => {
            this.partipantRidersForm = {
                riders: response.filter(p => p.isRider),
                beschermdeRenner: response.find(p => p.isBeschermdeRenner),
                waterdrager: response.find(p => p.isWaterdrager),
                linkebal: response.find(p => p.isLinkebal),
                meesterknecht: response.find(p => p.isMeesterknecht),
                tour: null,
            };
            this.beschermdeRennerMeesterKnechtWaarde =
                this.partipantRidersForm.beschermdeRenner && this.partipantRidersForm.beschermdeRenner.id ?
                    this.partipantRidersForm.beschermdeRenner.rider.waarde :
                    this.partipantRidersForm.meesterknecht && this.partipantRidersForm.meesterknecht.id ?
                        this.partipantRidersForm.meesterknecht.rider.waarde : 0;
            this.calculateUsedWaardepunten(response);
            this.setParticipantRidersComplete(response);
        });

        this.tour$ = this.store.select(getTour);
        this.tour$.subscribe(tour => this.tour = tour);

        this.teams$ = this.store.select(getTourTeams);
        this.isRegistrationOpen$ = this.store.select(isRegistrationOpen);
        this.isRegistrationOpen$.pipe(takeUntil(this.unsubscribe))
            .subscribe(response => {
                this.isRegistrationOpen = response;
                if (this.isRegistrationOpen === true) {
                    this.teams$.pipe(takeUntil(this.unsubscribe)).subscribe(teams => {
                        if (teams) {
                            this.teams = teams.map(team => {
                                return {
                                    ...team,
                                    tourRiders: [...team.tourRiders].sort((a, b) => b.waarde - a.waarde)
                                };
                            });

                            let ridersWaardeList = [];
                            this.newWaardeList = [];

                            teams.map(team => {
                                console.log('team.tourRiders lengte: ' + team.tourRiders.length);
                                ridersWaardeList = [...ridersWaardeList,
                                    ...team.tourRiders.map(rider => rider, {team: {id: team.id}})];
                            });

                            const mapList = {};
                            ridersWaardeList.forEach(item => {
                                const k = item.waarde;
                                mapList[k] = mapList[k] || [];
                                mapList[k].push(item);
                            });

                            this.newWaardeList = Object.keys(mapList).map(k => ({waarde: parseInt(k, 10), tourRiders: mapList[k]}));

                            this.newWaardeList = this.newWaardeList.map(nwl => {
                                return {
                                    ...nwl,
                                    tourRiders: [...nwl.tourRiders].sort((a, b) => {
                                        return a.rider.surNameShort < b.rider.surNameShort ? -1 : a.rider.surNameShort > b.rider.surNameShort ? 1 : 0;
                                    })
                                };
                            });

                            this.newWaardeList.sort((a, b) => b.waarde - a.waarde);
                        }
                    });
                }
            });
    }

    setCurrentRider(rider, team, $event) {
        this.currentRider = Object.assign(rider);
        console.log(this.currentRider);
        this.currentTeam = team;
        $event.stopPropagation();
    }

    private calculateUsedWaardepunten(participantRidersForm) {
        this.calculatedWaardepunten = participantRidersForm.filter(pr => pr.isRider).reduce((acc, obj) => {
            return obj.id ? acc + obj.rider.waarde : acc;
        }, 0);
    }

    setParticipantRidersComplete(partipantRidersForm: any[]) {
        this.isParticitantRidersComplete = partipantRidersForm &&
            this.calculatedWaardepunten <= this.maxParticipantRidersPunten &&
            partipantRidersForm &&
            partipantRidersForm.filter(r => r.id && r.isRider).length === this.maxParticipantRiders &&
            !!partipantRidersForm.find(pr => pr.isMeesterknecht && pr.id) &&
            !!partipantRidersForm.find(pr => pr.isLinkebal && pr.id) &&
            !!partipantRidersForm.find(pr => pr.isWaterdrager && pr.id) &&
            !!partipantRidersForm.find(pr => pr.isBeschermdeRenner && pr.id);
    }

    async openRidersPopup(index, predictionType) {
        const modal = await this.modalController.create({
            component: ChooseRiderPage,
            cssClass: 'my-custom-class',
            initialBreakpoint: 1,
            breakpoints: [0, 1],
            componentProps: {
                teams: this.teams,
                ridersWaardeList: this.newWaardeList,
                predictionType,
                beschermdeRennerMeesterKnechtWaarde: this.beschermdeRennerMeesterKnechtWaarde
            }
        });
        await modal.present();

        return await modal.onWillDismiss().then(data => {
            if (data.data) {
                this.uiService.presentToast(`${data.data.rider.rider.firstName} is toegevoegd aan je ploeg`);
                switch (data.data.predictionType) {
                    case 'rider':
                        this.addRenner(data.data.rider, index);
                        break;
                    case 'beschermderenner':
                        this.addBeschermdeRenner(data.data.rider, index);
                        this.beschermdeRennerMeesterKnechtWaarde = data.data.rider.waarde;
                        break;
                    case 'waterdrager':
                        this.addWaterdrager(data.data.rider, index);
                        break;
                    case 'linkebal':
                        this.addLinkebal(data.data.rider, index);
                        break;
                    case 'meesterknecht':
                        this.addMeesterknecht(data.data.rider, index);
                        this.beschermdeRennerMeesterKnechtWaarde = data.data.rider.waarde;
                        break;
                    default:
                        console.log('not implemented');
                }
            }
        });
    }

    addRenner(rider: IPrediction, index: number) {
        // this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true); // bij ophalen filteren ipv in store?
        this.submitForm({
            tour: this.tour,
            prediction: {isRider: true, rider: {...rider}}
        }, index);
    }

    addBeschermdeRenner(rider: IPrediction, index: number) {
        // this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true); // bij ophalen filteren ipv in store?
        this.submitForm({
            tour: this.tour,
            prediction: {isBeschermdeRenner: true, rider: {...rider}}
        }, index);
    }

    addMeesterknecht(rider: IPrediction, index: number) {
        // this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true); // bij ophalen filteren ipv in store?
        this.submitForm({
            tour: this.tour,
            prediction: {isMeesterknecht: true, rider: {...rider}}
        }, index);
    }

    addLinkebal(rider: IPrediction, index: number) {
        // this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true); // bij ophalen filteren ipv in store?
        this.submitForm({
            tour: this.tour,
            prediction: {isLinkebal: true, rider: {...rider}}
        }, index);

    }

    addWaterdrager(rider: IPrediction, index: number) {
        // this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true); // bij ophalen filteren ipv in store?
        this.submitForm({
            tour: this.tour,
            prediction: {isWaterdrager: true, rider: {...rider}}
        }, index);
    }

    showBeschermdeRennerOfMeesterknecht() {
        if (this.partipantRidersForm && this.partipantRidersForm.meesterknecht && this.currentRider) {
            return (this.currentRider.waarde === this.partipantRidersForm.meesterknecht.rider.waarde);
        }
        if (this.partipantRidersForm && this.partipantRidersForm.beschermdeRenner && this.currentRider) {
            return (this.currentRider.waarde === this.partipantRidersForm.beschermdeRenner.rider.waarde);
        }
        return true;
    }

    deleteRider(prediction: IPrediction) {
        this.predictionService.deletePrediction(prediction.id).subscribe(response => {
            this.store.dispatch(new fromParticipantForm.DeleteRiderFromForm(Object.assign(prediction)));
            if ((prediction.isMeesterknecht || prediction.isBeschermdeRenner) &&
                (this.partipantRidersForm.beschermdeRenner && !this.partipantRidersForm.beschermdeRenner.id &&
                    this.partipantRidersForm.meesterknecht && !this.partipantRidersForm.meesterknecht.id)) {
                this.beschermdeRennerMeesterKnechtWaarde = 0;
            }
            // this.setCurrentRiderAsSelected(prediction.rider, prediction.rider.team, false);
        });

    }

    submitForm(body?, formIndex?) {
        this.predictionService.submitPrediction(body)
            .subscribe(response => {
                this.store.dispatch(new AddRiderToForm({
                    ...response,
                    index: formIndex
                }));
            }, error => {
                if (error.error.statusCode === 403) {
                    this.uiService.presentToast(error.error.message);
                } else {
                    this.uiService.presentToast('Het opslaan is niet gelukt');
                }
                console.log(error);
            });
    }

    setCurrentRiderAsSelected(ridertje: ITourrider, teampje: ITeam, selected: boolean) {
        this.store.dispatch(new fromTour.SetCurrentRiderAsSelected({rider: ridertje, team: teampje, selected}));
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
