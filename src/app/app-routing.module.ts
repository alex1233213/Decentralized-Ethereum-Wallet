import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessWalletComponent } from "./components/access-wallet/access-wallet.component";
import { CreateWalletComponent } from "./components/create-wallet/create-wallet.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'access-wallet', component: AccessWalletComponent },
  { path: 'create-wallet', component: CreateWalletComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
