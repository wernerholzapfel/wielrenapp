import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RennersPage } from './renners.page';

const routes: Routes = [
  {
    path: '',
    component: RennersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RennersPageRoutingModule {}
