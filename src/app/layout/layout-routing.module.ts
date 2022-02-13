import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletLayoutComponent } from "./wallet-layout/wallet-layout.component";
import {HomePageLayoutComponent} from "./home-page-layout/home-page-layout.component";

const routes: Routes = [
  {
    path: 'wallet',
    component: WalletLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {
    path: '',
    component: HomePageLayoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
