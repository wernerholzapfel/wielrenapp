import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-etappe-uitslag',
    templateUrl: './etappe-uitslag.component.html',
    styleUrls: ['./etappe-uitslag.component.scss'],
})
export class EtappeUitslagComponent implements OnInit {

    @Input() uitslag: any[];
    @Input() participant: any;
    @Input() selectedEtappe: any;

    constructor(private modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.uitslag
            .filter(item => item.position !== 'Uit' && item.position !== 'WD')
            .map(etappe => {
                // punten toevoegen indien renner in uitslag voorkomt
                const zitinuitslag = this.participant.predictions.find(item => item.rider.id === etappe.tourrider.id);
                if (zitinuitslag) {
                    etappe.punten = zitinuitslag.totalStagePoints;
                }
                etappe.selected = !!this.participant.predictions.find(item => item.rider.id === etappe.tourrider.id);
                return etappe;
            });

        // waterdagers en uitvallers kunnen zonder in uitslag te zitten toch punten hebben behaald, vandaar deze toevoegen.
        const waterdragerEnUitvallers = this.participant.predictions
            // waterdager alleen tonen indien hij niet in etappeRowData zit
            .filter(prediction => prediction.isWaterdrager && !this.uitslag.find(item => item.tourrider.id === prediction.rider.id) ||
                (prediction.rider.isOut && prediction.rider.latestEtappe.id === this.selectedEtappe.id))
            .map(item => {
                return {
                    id: item.id,
                    position: item.rider.isOut ? 'Uit' : 'WD',
                    punten: item.totalStagePoints,
                    selected: true,
                    tourrider: item.rider,
                };
            });


        this.uitslag = [...this.uitslag, ...waterdragerEnUitvallers];
    }

    dismissModal() {
        this.modalCtrl.dismiss();
    }
}
