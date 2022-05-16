import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseRiderPageRoutingModule } from './choose-rider-routing.module';

import { ChooseRiderPage } from './choose-rider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseRiderPageRoutingModule
  ],
  declarations: [ChooseRiderPage]
})
export class ChooseRiderPageModule {}
