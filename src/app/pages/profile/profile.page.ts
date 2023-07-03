import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, of } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { ParticipantService } from 'src/app/services/participant.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { IAppState } from '../../store/store';
import { getParticipant } from 'src/app/store/participant/participant.reducer';
import * as participant from 'src/app/store/participant/participant.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  unsubscribe = new Subject<void>();
  profile = {
    id: null,
    displayName: '',
    teamName: '',
  };
  constructor(private participantService: ParticipantService, private uiService: UiServiceService,
    private store: Store<IAppState>) { }

  ngOnInit() {
    this.store.select(getParticipant)
      .pipe(takeUntil(this.unsubscribe)).subscribe(participant => {
        if (participant) {
          this.profile.id = participant.id
          this.profile.displayName = participant.displayName;
          this.profile.teamName = participant.teamName;  
        }
      }
      )
  }

  updateProfile() {
    if (this.profile.id) {
      this.participantService.updateParticipant({
        id: this.profile.id,
        displayName: this.profile.displayName,
        teamName: this.profile.teamName,
      })
        .subscribe(participantResponse => {
          if (participantResponse) {
            of(new participant.FetchParticipantSuccess(participantResponse))
            this.uiService.presentToast('Opslaan gelukt')
          }
          else {
            catchError(err => of(new participant.FetchParticipantFailure(err)))
            this.uiService.presentToast('Opslaan mislukt', 'danger')
          }
        })  
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
