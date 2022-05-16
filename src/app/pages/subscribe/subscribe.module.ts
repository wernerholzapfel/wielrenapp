import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SubscribePageRoutingModule} from './subscribe-routing.module';

import {SubscribePage} from './subscribe.page';
import {OrderModule} from 'ngx-order-pipe';
import {ChooseRiderPageModule} from '../choose-rider/choose-rider.module';
import {CustomComponentModule} from '../../components/custom-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SubscribePageRoutingModule,
        OrderModule,
        ChooseRiderPageModule,
        CustomComponentModule,
    ],
    declarations: [SubscribePage]
})
export class SubscribePageModule {
}
