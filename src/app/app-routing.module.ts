import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessWalletComponent } from "./components/access-wallet/access-wallet.component";
import { CreateWalletComponent } from "./components/create-wallet/create-wallet.component";

const routes: Routes = [
  { path: 'access-wallet', component: AccessWalletComponent },
  { path: 'access-wallet', component: CreateWalletComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
