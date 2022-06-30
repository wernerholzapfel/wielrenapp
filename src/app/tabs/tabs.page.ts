import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../store/store';
import {isRegistrationOpen} from '../store/tour/tour.reducer';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  isRegistrationOpen$: Observable<boolean>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.isRegistrationOpen$ = this.store.pipe(select(isRegistrationOpen));
  }
}
