import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnlockWalletComponent } from './unlock-wallet.component';

const routes: Routes = [{ path: '', component: UnlockWalletComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnlockWalletRoutingModule { }
