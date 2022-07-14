import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KlassementenPage } from './klassementen.page';

const routes: Routes = [
  {
    path: '',
    component: KlassementenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KlassementenPageRoutingModule {}
