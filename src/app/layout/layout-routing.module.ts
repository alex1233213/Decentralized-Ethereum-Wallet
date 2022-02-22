import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageLayoutComponent } from "./home-page-layout/home-page-layout.component";
import { WalletLayoutComponent } from "./wallet-layout/wallet-layout.component";
import { DashboardComponent } from "../wallet/dashboard/dashboard.component";
import { SendTransactionComponent } from "../wallet/send-transaction/send-transaction.component";
import { SwapComponent } from "../wallet/swap/swap.component";
import { DappsComponent } from "../wallet/dapps/dapps.component";

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
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'send-transaction',
        component: SendTransactionComponent
      },
      {
        path: 'swap',
        component: SwapComponent
      },
      {
        path: 'dapps',
        component: DappsComponent
      }
    ]
  },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
