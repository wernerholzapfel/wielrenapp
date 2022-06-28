import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ETAPPE, KLASSEMENT} from '../models/constants';
import {ToastController} from '@ionic/angular';
import {IRider} from '../models/rider.model';
import {ITourrider} from '../models/etappe.model';
import {ITeam} from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private toastCtrl: ToastController) { }

  showUitslagenType: BehaviorSubject<string> = new BehaviorSubject(ETAPPE);
  tourStartDate: Date;

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

  filterRenners(searchTerm: string, teams: ITeam[]): any[] {
    if ((searchTerm === undefined || searchTerm.length < 2)) {
      return teams;
    } else {
      searchTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return teams.map(team => {
        return {
          ...team,
          tourRiders: team.tourRiders.filter(deelnemer => {
        const searchableWords: string[] = (`${deelnemer.rider.firstName} ${deelnemer?.rider.surName}`)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .split(' ');

        return (!searchTerm || searchTerm
            .trim()
            .split(' ')
            .map(word => word)
            .filter(searchWord => {
              return searchableWords.filter(searchableWord => {
                return searchableWord.indexOf(searchWord.trim()) > -1;
              }).length > 0;
            }).length > 0);
      })
        };
      });
    }
  }
}
