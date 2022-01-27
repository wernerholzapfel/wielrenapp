import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/store';
import {FetchParticipant} from '../store/participant/participant.actions';

@Injectable()
export class AuthService {
    public user$: Observable<firebase.User>;
    public isAdmin = false;

    constructor(private firebaseAuth: AngularFireAuth, private router: Router, private store: Store<IAppState>) {
        this.user$ = firebaseAuth.authState;

        this.user$.subscribe(user => {
            if (user) {
                this.store.dispatch(new FetchParticipant());

                this.firebaseAuth.idTokenResult.subscribe(tokenResult => {
                    this.isAdmin = tokenResult.claims.admin;
                });
            }
        });
    }

    signInRegular(email, password) {
        const credential = firebase.auth.EmailAuthProvider.credential(email, password);
        return this.firebaseAuth.signInWithEmailAndPassword(email, password);
    }

    updateProfile(displayName: string) {
        this.firebaseAuth.user.subscribe(response => {
            response.updateProfile({displayName});
        });
    }

    signUpRegular(email, password, displayName) {
        return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
    }

    isLoggedIn() {
        return this.firebaseAuth.authState;
    }

    logout() {
        this.firebaseAuth.signOut()
            .then((res) =>
                this.router.navigate(['/']));
    }

    getToken(): Observable<string> {
        return this.firebaseAuth.idToken;
    }

    getTokenResult(): Observable<firebase.auth.IdTokenResult> {
        return this.firebaseAuth.idTokenResult;
    }

    sendPasswordResetEmail(email: string): Promise<any> {
        return this.firebaseAuth.sendPasswordResetEmail(email);
    }


}
