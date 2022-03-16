import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { WalletLayoutComponent } from './wallet-layout/wallet-layout.component';
import {NbLayoutModule, NbListModule, NbSelectModule, NbSidebarModule} from "@nebular/theme";
import { HomePageLayoutComponent } from './home-page-layout/home-page-layout.component';
import { WalletModule } from "../wallet/wallet.module";


@NgModule({
  declarations: [
    WalletLayoutComponent,
    HomePageLayoutComponent
  ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        NbLayoutModule,
        NbSidebarModule,
        WalletModule,
        NbListModule,
        NbSelectModule
    ]
})
export class LayoutModule { }
