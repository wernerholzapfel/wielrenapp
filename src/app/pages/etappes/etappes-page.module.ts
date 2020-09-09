import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EtappesPage} from './etappes-page.component';

import {EtappesPagePageRoutingModule} from './etappes-page-routing.module';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {TableSettingsComponent} from '../../components/table-settings/table-settings.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        EtappesPagePageRoutingModule,
        SwiperModule,
    ],
    entryComponents: [
        TableSettingsComponent,
    ],
    declarations: [
        EtappesPage,
        TableSettingsComponent,
    ]
})
export class EtappesPageModule {
}
