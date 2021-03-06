import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageLayoutComponent } from "./home-page-layout/home-page-layout.component";
import { WalletLayoutComponent } from "./wallet-layout/wallet-layout.component";
import { DashboardComponent } from "../wallet/dashboard/dashboard.component";
import { TransactionsComponent } from "../wallet/transactions/transactions.component";
import { TxHistoryComponent } from "../wallet/tx-history/tx-history.component";
import { WalletGuard } from "../guards/dashboard/wallet-guard.service";

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
      }
    ]
  },


  // wallet routes
  {
    path: 'wallet',
    component: WalletLayoutComponent,
    canActivate: [WalletGuard],
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
        path: 'transaction/send-tx',
        component: TransactionsComponent,
      },
      {
        path: 'tx-history',
        component: TxHistoryComponent
      }

    ]
  },

  //all unknown paths redirect to the home page
  {
    path: '**',
    redirectTo: ''
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
