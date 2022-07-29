import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IParticipant} from '../models/participant.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ITotaalStand} from '../models/uitslagen.model';

@Injectable({
  providedIn: 'root'
})
export class UitslagenService {

  constructor(private http: HttpClient) { }

  getTotaalStand(tourId: string): Observable<ITotaalStand[]> {
    return this.http.get<ITotaalStand[]>(`${environment.apiBaseUrl}/prediction-score/totaal/` + tourId);
  }

  getLatestDrivenEtappeStand(tourId): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/prediction-score/latestetappe/${tourId}`);
  }

}
