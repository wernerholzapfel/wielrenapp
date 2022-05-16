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

@NgModule({
    declarations: [
        TableSettingsComponent,
        DeelnemerTableSummaryComponent,
        RennerTableSummaryComponent,
        LoginComponent,
        ChooseRiderItemComponent,
        FilterIsOutPipe
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
        FilterIsOutPipe
    ],
    providers: []
})
export class CustomComponentModule {
}
