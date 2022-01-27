import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRider} from '../models/rider.model';
import {environment} from '../../environments/environment';
import {ITourrider} from '../models/etappe.model';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {ITourriders} from '../models/tourriders.model';

@Injectable()
export class RiderService {

  constructor(private http: HttpClient, private db: AngularFireDatabase,
  ) {
  }

  getRiders(): Observable<IRider[]> {

    return this.http.get<IRider[]>(`${environment.apiBaseUrl}/riders`);
  }

  getDetailTourriders(tourId: string): Observable<ITourriders[]> {
    return this.db.list<ITourriders>(tourId + '/renners/').valueChanges();
  }

  updateTourRidersFirebase(tourId): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/tourriders/details/${tourId}`, null);
  }

  getTourriderDetails(tourriderId: string): Observable<ITourrider> {
    return this.http.get<ITourrider>(`${environment.apiBaseUrl}/participants/rider/` + tourriderId);

  }
}
