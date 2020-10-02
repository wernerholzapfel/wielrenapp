import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import * as fromParticipantForm from '../../store/participantform/participantform.actions';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

    constructor(public authService: AuthService, private store: Store<IAppState>) {
    }

    ngOnInit() {
    }

    logout() {
        this.authService.logout();
        this.store.dispatch(new fromParticipantForm.ClearParticipantform());
    }

}
