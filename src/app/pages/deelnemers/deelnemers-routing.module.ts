import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeelnemersPage } from './deelnemers.page';

const routes: Routes = [
  {
    path: '',
    component: DeelnemersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeelnemersPageRoutingModule {}
