import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StandPageRoutingModule } from './stand-routing.module';

import { StandPage } from './stand.page';
import {CustomComponentModule} from '../../components/custom-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StandPageRoutingModule,
        CustomComponentModule,
    ],
  declarations: [StandPage]
})
export class StandPageModule {}
