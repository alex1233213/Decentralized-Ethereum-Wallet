import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessWalletComponent } from "./components/access-wallet/access-wallet.component";
import { CreateWalletComponent } from "./components/create-wallet/create-wallet.component";
import { RestoreWalletComponent } from "./components/restore-wallet/restore-wallet.component";

const routes: Routes = [
  { path: 'access', component: AccessWalletComponent },
  { path: 'create', component: CreateWalletComponent },
  { path: 'restore', component: RestoreWalletComponent },
  { path: '', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'wallet', loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
