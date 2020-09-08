import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {from, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IEtappe} from '../models/etappe.model';
import {groupBy, map, mergeMap, toArray} from 'rxjs/operators';

@Injectable()
export class EtappeService {

    constructor(private http: HttpClient) {
    }

    getEtappes(tourId): Observable<IEtappe[]> {
        // @ts-ignore
        return this.http.get<IEtappe[]>(`${environment.apiBaseUrl}/etappes/tour/${tourId}`)
    }

    // todo create model
    getLatestDrivenEtappe(tourId): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiBaseUrl}/participants/table/${tourId}/latestetappe`);
    }

    saveEtappe(body: IEtappe): Observable<IEtappe> {
        return this.http.post<IEtappe>(`${environment.apiBaseUrl}/etappes`, body)
            .pipe(map(res => <IEtappe> res));
    }
}
