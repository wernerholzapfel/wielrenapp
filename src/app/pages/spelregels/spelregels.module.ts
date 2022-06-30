import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpelregelsPageRoutingModule } from './spelregels-routing.module';

import { SpelregelsPage } from './spelregels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpelregelsPageRoutingModule
  ],
  declarations: [SpelregelsPage]
})
export class SpelregelsPageModule {}
