import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {delay, map, retryWhen} from 'rxjs/operators';
import {isRegistrationOpen} from '../store/tour/tour.reducer';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/store';

@Injectable({
    providedIn: 'root'
})
export class IsRegistrationClosedGuard implements CanActivate {
    constructor(private store: Store<IAppState>) {
    }


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.store.select(isRegistrationOpen).pipe(map(response => {
            if (response === null || response === undefined) {
                throw new Error();
            } else {
                return !response;
            }
        }), retryWhen(errors => {
            return this.store.select(isRegistrationOpen).pipe(delay(200));
        }));
    }
}
