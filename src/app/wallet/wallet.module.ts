import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { NbLayoutModule, NbSidebarModule } from "@nebular/theme";


@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    NbLayoutModule,
    NbSidebarModule
  ]
})
export class WalletModule { }
