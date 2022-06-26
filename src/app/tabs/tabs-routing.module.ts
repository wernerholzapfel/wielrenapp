import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {IsRegistrationClosedGuard} from '../guards/is-registration-closed-guard.service';
import {IsRegistrationOpenGuard} from '../guards/is-registration-open-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'etappes',
        loadChildren: () => import('../pages/etappes/etappes-page.module').then(m => m.EtappesPageModule)
,        canActivate: [IsRegistrationClosedGuard],
      },
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      }, {
        path: 'team',
        loadChildren: () => import('../pages/team/team.module').then(m => m.TeamPageModule),
        canActivate: [IsRegistrationClosedGuard],
      },
      {
        path: 'stand',
        loadChildren: () => import('../pages/stand/stand.module').then(m => m.StandPageModule),
        canActivate: [IsRegistrationClosedGuard],

      },
      {
        path: 'renners',
        loadChildren: () => import('../pages/renners/renners.module').then(m => m.RennersPageModule)
        ,        canActivate: [IsRegistrationClosedGuard],

      },
      {
        path: 'renner-detail',
        loadChildren: () => import('../pages/renner-detail/renner-detail.module').then( m => m.RennerDetailPageModule),
        canActivate: [IsRegistrationClosedGuard],

      },
      {
        path: 'inschrijven',
        loadChildren: () => import('../pages/subscribe/subscribe.module').then(m => m.SubscribePageModule),
        canActivate: [IsRegistrationOpenGuard],
      },
      {
        path: 'menu',
        loadChildren: () => import('../pages/menu/menu.module').then(m => m.MenuPageModule),
        data: {animation: 'menuPage',
          canActivate: [IsRegistrationClosedGuard],
        }
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
