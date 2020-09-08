import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtappesPage } from './etappes-page.component';

const routes: Routes = [
  {
    path: '',
    component: EtappesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtappesPagePageRoutingModule {}
