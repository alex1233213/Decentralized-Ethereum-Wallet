import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageLayoutComponent } from "./home-page-layout/home-page-layout.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../home-page/home-page.module').then(m => m.HomePageModule)
      },
      {
        path: 'unlock',
        loadChildren: () => import('../unlock-wallet/unlock-wallet.module').then( m => m.UnlockWalletModule)
      },

      {
        path: 'create',
        loadChildren: () => import('../create-wallet/create-wallet.module').then(m => m.CreateWalletModule)
      }
    ]
  },


  // wallet routes
  // {
  //   path: 'wallet',
  //   component: WalletLayoutComponent,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
  //     }
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
