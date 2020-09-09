import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableSettingsComponent} from './table-settings/table-settings.component';
import {DeelnemerTableSummaryComponent} from './deelnemer-table-summary/deelnemer-table-summary.component';

@NgModule({
    declarations: [
        TableSettingsComponent,
        DeelnemerTableSummaryComponent,
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
    ],
    providers: [],
})
export class CustomComponentModule {
}
