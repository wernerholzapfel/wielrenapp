import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeelnemersPageRoutingModule } from './deelnemers-routing.module';

import { DeelnemersPage } from './deelnemers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeelnemersPageRoutingModule
  ],
  declarations: [DeelnemersPage]
})
export class DeelnemersPageModule {}
