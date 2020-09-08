import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
// import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/store';
import {FetchParticipant} from '../store/participant/participant.actions';

@Injectable()
export class AuthService {
    public user$: Observable<firebase.User>;
    public isAdmin = false;

    constructor(private angularFireAuth: AngularFireAuth, private router: Router, private store: Store<IAppState>) {
        this.user$ = angularFireAuth.authState;

        this.user$.subscribe(user => {
            if (user) {
                this.store.dispatch(new FetchParticipant());

                this.angularFireAuth.idTokenResult.subscribe(tokenResult => {
                    this.isAdmin = tokenResult.claims.admin;
                });
            }
        });
    }

    signInRegular(email, password) {
        const credential = firebase.auth.EmailAuthProvider.credential(email, password);
        return this.angularFireAuth.signInWithEmailAndPassword(email, password);
    }

    updateProfile(displayName: string) {
        this.angularFireAuth.user.subscribe(response => {
            response.updateProfile({displayName});
        });
    }

    signUpRegular(email, password, displayName) {
        return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
    }

    isLoggedIn() {
        return this.angularFireAuth.authState;
    }

    logout() {
        this.angularFireAuth.signOut()
            .then((res) =>
                this.router.navigate(['/']));
    }

    getToken(): Observable<string> {
        return this.angularFireAuth.idToken;
    }

    getTokenResult(): Observable<firebase.auth.IdTokenResult> {
        return this.angularFireAuth.idTokenResult;
    }

    sendPasswordResetEmail(email: string): Promise<any> {
        return this.angularFireAuth.sendPasswordResetEmail(email);
    }


}
