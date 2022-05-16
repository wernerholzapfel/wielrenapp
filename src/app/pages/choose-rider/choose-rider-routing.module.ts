import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ChooseRiderPage} from './choose-rider.page';
import {CommonModule} from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component: ChooseRiderPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),
        CommonModule],
    exports: [RouterModule],
})
export class ChooseRiderPageRoutingModule {
}
