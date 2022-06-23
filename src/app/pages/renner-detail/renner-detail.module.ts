import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RennerDetailPageRoutingModule } from './renner-detail-routing.module';

import { RennerDetailPage } from './renner-detail.page';
import {CustomComponentModule} from '../../components/custom-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RennerDetailPageRoutingModule,
        CustomComponentModule
    ],
  declarations: [RennerDetailPage]
})
export class RennerDetailPageModule {}
