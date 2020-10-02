import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RennersPageRoutingModule } from './renners-routing.module';

import { RennersPage } from './renners.page';
import {CustomComponentModule} from '../../components/custom-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RennersPageRoutingModule,
        CustomComponentModule
    ],
  declarations: [RennersPage]
})
export class RennersPageModule {}
