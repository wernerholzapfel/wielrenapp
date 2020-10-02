import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableSettingsComponent} from './table-settings/table-settings.component';
import {DeelnemerTableSummaryComponent} from './deelnemer-table-summary/deelnemer-table-summary.component';
import {RennerTableSummaryComponent} from './renner-table-summary/renner-table-summary.component';
import {LoginComponent} from './login/login.component';

@NgModule({
    declarations: [
        TableSettingsComponent,
        DeelnemerTableSummaryComponent,
        RennerTableSummaryComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    entryComponents: [],
    exports: [
        TableSettingsComponent,
        DeelnemerTableSummaryComponent,
        RennerTableSummaryComponent,
        LoginComponent
    ],
    providers: [],
})
export class CustomComponentModule {
}
