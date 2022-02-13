import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { WalletLayoutComponent } from './wallet-layout/wallet-layout.component';
import {NbLayoutModule, NbSidebarModule} from "@nebular/theme";


@NgModule({
  declarations: [
    WalletLayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NbLayoutModule,
    NbSidebarModule
  ]
})
export class LayoutModule { }
