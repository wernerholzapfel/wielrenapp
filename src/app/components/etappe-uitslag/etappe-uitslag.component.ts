import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ParticipantService } from 'src/app/services/participant.service';
import { UiServiceService } from '../../services/ui-service.service';
import { PredictionService } from 'src/app/services/prediction.service';
import { PredictionTypeEnum } from 'src/app/models/predictionScoreForParticipant';

@Component({
    selector: 'app-etappe-uitslag',
    templateUrl: './etappe-uitslag.component.html',
    styleUrls: ['./etappe-uitslag.component.scss'],
})
export class EtappeUitslagComponent implements OnInit {

    @Input() uitslag: any[];
    @Input() participant: any;
    @Input() selectedEtappe: any;
    @Input() mainValue: string;
    @Input() predictionType: PredictionTypeEnum;

    constructor(private modalCtrl: ModalController, private predictionService: PredictionService,
        private uiService: UiServiceService) {
    }

    ngOnInit() { }

    ionViewWillEnter() {
        if (this.selectedEtappe) {
            this.predictionService.getPredictionScoreByParticipantId(this.selectedEtappe.id, this.participant.id, this.uiService.selectedTour.id)
                .subscribe(predictionScores => {
                    this.mainValue = 'totalStagePoints';
                    this.uitslag
                        .filter(item => item.position !== 'Uit' && item.position !== 'WD')
                        .map(etappe => {
                            // punten toevoegen indien renner in uitslag voorkomt
                            const zitinuitslag = predictionScores.find(item => item.prediction.rider.id === etappe.tourrider.id);
                            if (zitinuitslag) {
                                etappe.punten = zitinuitslag.punten;
                            }
                            etappe.selected = !!predictionScores.find(item => item.prediction.rider.id === etappe.tourrider.id);
                            return etappe;
                        });

                    // waterdagers en uitvallers kunnen zonder in uitslag te zitten toch punten hebben behaald, vandaar deze toevoegen.
                    const waterdragerEnUitvallers = predictionScores
                        // waterdager alleen tonen indien hij niet in etappeRowData zit
                        .filter(predictionScore => predictionScore.prediction.isWaterdrager && !this.uitslag.find(item => item.tourrider.id === predictionScore.prediction.rider.id)
                            || (predictionScore.prediction.rider.isOut && predictionScore.prediction.rider.latestEtappe && predictionScore.prediction.rider.latestEtappe.id === this.selectedEtappe.id)
                        )
                        .map(item => {
                            return {
                                id: item.id,
                                position: item.prediction.rider.isOut ? 'Uit' : 'WD',
                                punten: item.punten,
                                selected: true,
                                tourrider: item.prediction.rider
                            };
                        });


                    this.uitslag = [...this.uitslag, ...waterdragerEnUitvallers];
                })
        } else {
            this.predictionService.getPredictionScoresPointsForParticipant(this.predictionType, this.participant.id, this.uiService.selectedTour.id)
                .subscribe(predictionScores => {
                    //   this.mainValue = 'totalStagePoints';
                    this.uitslag
                        .filter(item => item.position !== 'Uit' && item.position !== 'WD')
                        .map(etappe => {
                            // punten toevoegen indien renner in uitslag voorkomt
                            const zitinuitslag = predictionScores.find(item => item.prediction.rider.id === etappe.tourrider.id);
                            if (zitinuitslag) {
                                etappe.punten = zitinuitslag.punten;
                            }
                            etappe.selected = !!predictionScores.find(item => item.prediction.rider.id === etappe.tourrider.id);
                            console.log(etappe)
                            return etappe;
                        });

                    // waterdagers en uitvallers kunnen zonder in uitslag te zitten toch punten hebben behaald, vandaar deze toevoegen.
                    const waterdragerEnUitvallers = predictionScores
                        // waterdager alleen tonen indien hij niet in etappeRowData zit
                        .filter(predictionScore => predictionScore.prediction.isWaterdrager && !this.uitslag.find(item => item.tourrider.id === predictionScore.prediction.rider.id)
                            || (predictionScore.prediction.rider.isOut && predictionScore.prediction.rider.latestEtappe && predictionScore.prediction.rider.latestEtappe.id === this.selectedEtappe.id)
                        )
                        .map(item => {
                            return {
                                id: item.id,
                                position: item.prediction.rider.isOut ? 'Uit' : 'WD',
                                punten: item.punten,
                                selected: true,
                                tourrider: item.prediction.rider
                            };
                        });


                    this.uitslag = [...this.uitslag, ...waterdragerEnUitvallers];
                })
        }




    }

    dismissModal() {
        
        this.modalCtrl.dismiss();
    }

    ionViewWillLeave() {
        this.uitslag.map(item => {
            return { ...item, selected: false }
        })
    }
}
