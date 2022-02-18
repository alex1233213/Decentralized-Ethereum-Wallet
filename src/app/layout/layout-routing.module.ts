import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
