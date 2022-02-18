import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreWalletRoutingModule } from './restore-wallet-routing.module';
import { RestoreWalletComponent } from './restore-wallet.component';


@NgModule({
  declarations: [
    RestoreWalletComponent
  ],
  imports: [
    CommonModule,
    RestoreWalletRoutingModule
  ]
})
export class RestoreWalletModule { }
