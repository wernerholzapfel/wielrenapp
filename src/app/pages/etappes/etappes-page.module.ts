import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EtappesPage} from './etappes-page.component';

import {EtappesPagePageRoutingModule} from './etappes-page-routing.module';
import {CustomComponentModule} from '../../components/custom-components.module';
import {SwiperModule} from 'swiper/angular';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        EtappesPagePageRoutingModule,
        CustomComponentModule,
        SwiperModule
    ],
    declarations: [
        EtappesPage
    ]
})
export class EtappesPageModule {
}
