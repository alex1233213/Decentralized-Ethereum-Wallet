import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageLayoutComponent } from "./home-page-layout/home-page-layout.component";
import { WalletLayoutComponent } from "./wallet-layout/wallet-layout.component";

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
      },

      {
        path: 'restore',
        loadChildren: () => import('../restore-wallet/restore-wallet.module').then(m => m.RestoreWalletModule)
      },
    ]
  },


  // wallet routes
  {
    path: 'wallet',
    component: WalletLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../wallet/wallet.module').then(m => m.WalletModule)
      }
    ]
  },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
