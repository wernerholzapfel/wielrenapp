import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ETAPPE, KLASSEMENT} from '../models/constants';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private toastCtrl: ToastController) { }

  showUitslagenType: BehaviorSubject<string> = new BehaviorSubject(ETAPPE);

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
}
