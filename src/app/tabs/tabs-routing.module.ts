import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'etappes',
        loadChildren: () => import('../pages/etappes/etappes-page.module').then(m => m.EtappesPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      }, {
        path: 'team',
        loadChildren: () => import('../pages/team/team.module').then(m => m.TeamPageModule)
      },
      {
        path: 'stand',
        loadChildren: () => import('../pages/stand/stand.module').then(m => m.StandPageModule)
      },
      {
        path: 'renners',
        loadChildren: () => import('../pages/renners/renners.module').then(m => m.RennersPageModule)
      },
      {
        path: 'renner-detail',
        loadChildren: () => import('../pages/renner-detail/renner-detail.module').then( m => m.RennerDetailPageModule)
      },
      {
        path: 'inschrijven',
        loadChildren: () => import('../pages/subscribe/subscribe.module').then(m => m.SubscribePageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('../pages/menu/menu.module').then(m => m.MenuPageModule),
        data: {animation: 'menuPage'}
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
