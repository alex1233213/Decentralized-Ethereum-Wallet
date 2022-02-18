import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWalletComponent } from './create-wallet.component';

const routes: Routes = [{ path: '', component: CreateWalletComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateWalletRoutingModule { }
