import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KlassementenPageRoutingModule } from './klassementen-routing.module';

import { KlassementenPage } from './klassementen.page';
import {CustomComponentModule} from '../../components/custom-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        KlassementenPageRoutingModule,
        CustomComponentModule
    ],
  declarations: [KlassementenPage]
})
export class KlassementenPageModule {}
