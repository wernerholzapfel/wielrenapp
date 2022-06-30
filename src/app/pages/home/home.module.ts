import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {HeadlinesComponent} from '../../components/headlines/headlines.component';
import {Top5Component} from '../../components/top5/top5.component';
import {Deelnemertop5Component} from '../../components/top5/deelnemertop5/deelnemertop5.component';
import {Ridertop5Component} from '../../components/top5/ridertop5/ridertop5.component';
import {CustomComponentModule} from '../../components/custom-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        CustomComponentModule,
    ],
    exports: [],
    declarations: [HomePage,
        Top5Component,
        Deelnemertop5Component,
        Ridertop5Component
    ]
})
export class HomePageModule {}
