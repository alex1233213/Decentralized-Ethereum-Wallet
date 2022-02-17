import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWalletComponent } from "./components/create-wallet/create-wallet.component";
import { RestoreWalletComponent } from "./components/restore-wallet/restore-wallet.component";

const routes: Routes = [
  { path: '', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'create', component: CreateWalletComponent },
  { path: 'restore', component: RestoreWalletComponent },
  { path: 'wallet', loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule) },
  { path: 'unlock', loadChildren: () => import('./unlock-wallet/unlock-wallet.module').then(m => m.UnlockWalletModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
