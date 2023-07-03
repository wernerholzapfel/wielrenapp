import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ETAPPE, KLASSEMENT } from '../models/constants';
import { ToastController } from '@ionic/angular';
import { ITour } from '../models/tour.model';

@Injectable({
    providedIn: 'root'
})
export class UiServiceService {
    pushToken$: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(private toastCtrl: ToastController) {
    }

    showUitslagenType: BehaviorSubject<string> = new BehaviorSubject(ETAPPE);
    tourStartDate: Date;
    selectedTour: ITour;

    async presentToast(message: string, color: string = 'tertiary', duration: number = 2000, showCloseButton = true) {
        const toast = await this.toastCtrl.create({
            message,
            duration,
            position: 'top',
            buttons: [
                {
                    text: 'OK',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ],
            color,
            cssClass: 'toast-position'
        });
        return toast.present();
    }

    determineDeelnemerPunten(line: any, mainValue: string) {
        if (line) {
            switch (mainValue) {
                case 'totalStagePoints':
                    return line.etappepunten;
                case 'totalMountainPoints':
                    return line.bergpunten;
                case 'totalPointsPoints':
                    return line.puntenpunten;
                case 'totalTourPoints':
                    return line.algemeenpunten;
                case 'totalYouthPoints':
                    return line.jongerenpunten;
                case 'deltaTotalStagePoints':
                    return line.deltaEtappepunten;
                case 'totalPoints':
                    return line.totaalpunten;
                case 'gekozen':
                    return line.gekozen;
                default:
                    return line.totaalpunten;
            }
        }
    }

    determineImageUrl(mainValue: string) {
        switch (mainValue) {
            case 'etappepunten':
            case 'totalStagePoints':
                return '/assets/etappes_donker.png';
            case 'totaalpunten':
                return '/assets/rider_icon.png';
            case 'totalMountainPoints':
            case 'bergpunten':
                return '/assets/shirt_berg.png';
            case 'totalPointsPoints':
            case 'puntenpunten':
                return '/assets/shirt_punten.png';
            case 'totalTourPoints':
            case 'algemeenpunten':
                return '/assets/shirt_algemeen.png';
            case 'totalYouthPoints':
            case 'jongerenpunten':
                return '/assets/shirt_jongeren.png';
            case 'deltaTotalStagePoints':
                return '/assets/rider_icon.png';
            default:
                return '/assets/rider_icon.png';

        }
    }
}
