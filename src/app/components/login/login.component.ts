import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ParticipantService} from '../../services/participant.service';
import {IAppState} from '../../store/store';
import * as fromParticipantForm from '../../store/participantform/participantform.actions';
import {Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {UiServiceService} from '../../services/ui-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    user = {
        email: '',
        password: '',
        displayName: '',
        teamName: '',
    };

    activeSegment = 'inschrijven';
    unsubscribe = new Subject<void>();
    wachtwoordvergeten = false;

    constructor(public authService: AuthService,
                private uiService: UiServiceService,
                public participantService: ParticipantService,
                private router: Router,
                private store: Store<IAppState>) {
    }

    userForm = new UntypedFormGroup({
        emailFormControl: new UntypedFormControl('', [
            Validators.required,
            Validators.email,
        ]),
        displayName: new UntypedFormControl('', [
            Validators.required,
        ]),
        teamName: new UntypedFormControl('', [
            Validators.required,
            Validators.maxLength(25)
        ]),
        passwordFormControl: new UntypedFormControl('', [
            Validators.required,
            Validators.minLength(8),
        ])
    });

    ngOnInit() {
    }

    signInWithEmail() {
        this.authService.signInRegular(this.user.email, this.user.password)
            .then((res) => {
                this.store.dispatch(new fromParticipantForm.ClearParticipantform());
                this.router.navigate(['/inschrijven']);
            })
            .catch((err) => {
                this.uiService.presentToast(err.message);
            });
    }

    sendPasswordResetEmail() {
        this.authService.sendPasswordResetEmail(this.user.email)
            .then((res) => {
                this.uiService.presentToast(res);
            })
            .catch((err) => {
                this.uiService.presentToast(err.message);
                console.log('error: ' + err);
            });
    }

    signUpRegular() {
        this.authService.signUpRegular(this.user.email, this.user.password, this.user.displayName)
            .then((res) => {
                    if (res) {
                        delete this.user.password;
                        this.participantService.postParticipant({
                            displayName: this.user.displayName,
                            teamName: this.user.teamName,
                            email: this.user.email
                        }).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
                            console.log('user opgeslagen in database');
                        });
                        this.store.dispatch(new fromParticipantForm.ClearParticipantform());
                        this.router.navigate(['/inschrijven']);
                    }
                }
            )
            .catch((err) => {
                this.uiService.presentToast(err.message);
            });
    }

    logout() {
        this.authService.logout();
        this.store.dispatch(new fromParticipantForm.ClearParticipantform());
    }

    activateResetPassword(isTrue: boolean) {
        this.wachtwoordvergeten = isTrue;
    }

    segmentChanged($event) {
        this.activeSegment = $event.detail.value;
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
