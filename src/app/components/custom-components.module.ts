import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableSettingsComponent} from './table-settings/table-settings.component';
import {DeelnemerTableSummaryComponent} from './deelnemer-table-summary/deelnemer-table-summary.component';
import {RennerTableSummaryComponent} from './renner-table-summary/renner-table-summary.component';
import {LoginComponent} from './login/login.component';
import {ChooseRiderItemComponent} from './choose-rider-item/choose-rider-item.component';
import {FilterIsOutPipe} from '../services/pipe/filter-is-out.pipe';
import {PuntenColComponent} from './punten-col/punten-col.component';
import {IconWithPointsComponent} from './icon-with-points/icon-with-points.component';
import {HeadlinesComponent} from './headlines/headlines.component';
import {SearchRidersPipe} from '../services/pipe/searchRiders.pipe';
import {EtappeUitslagComponent} from './etappe-uitslag/etappe-uitslag.component';

@NgModule({
    declarations: [
        TableSettingsComponent,
        DeelnemerTableSummaryComponent,
        RennerTableSummaryComponent,
        LoginComponent,
        ChooseRiderItemComponent,
        PuntenColComponent,
        HeadlinesComponent,
        IconWithPointsComponent,
        EtappeUitslagComponent,
        FilterIsOutPipe,
        SearchRidersPipe,
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        TableSettingsComponent,
        DeelnemerTableSummaryComponent,
        RennerTableSummaryComponent,
        LoginComponent,
        ChooseRiderItemComponent,
        PuntenColComponent,
        HeadlinesComponent,
        IconWithPointsComponent,
        EtappeUitslagComponent,
        FilterIsOutPipe,
        SearchRidersPipe,
    ],
    providers: []
})
export class CustomComponentModule {
}
