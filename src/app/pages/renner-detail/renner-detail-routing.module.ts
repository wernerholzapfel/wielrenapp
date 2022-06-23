import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RennerDetailPage } from './renner-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RennerDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RennerDetailPageRoutingModule {}
