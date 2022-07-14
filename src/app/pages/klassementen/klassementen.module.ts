import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KlassementenPageRoutingModule } from './klassementen-routing.module';

import { KlassementenPage } from './klassementen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KlassementenPageRoutingModule
  ],
  declarations: [KlassementenPage]
})
export class KlassementenPageModule {}
