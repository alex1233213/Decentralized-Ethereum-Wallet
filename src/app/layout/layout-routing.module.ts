import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletLayoutComponent } from "./wallet-layout/wallet-layout.component";
import { HomePageLayoutComponent } from "./home-page-layout/home-page-layout.component";
import { TestComponent } from "../components/test/test.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageLayoutComponent,
    children: [
      {
        path: '',
        component: TestComponent
      }
    ]
  },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
