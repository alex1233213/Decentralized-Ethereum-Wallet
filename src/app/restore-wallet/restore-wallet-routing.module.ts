import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestoreWalletComponent } from './restore-wallet.component';

const routes: Routes = [{ path: '', component: RestoreWalletComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestoreWalletRoutingModule { }
