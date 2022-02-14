import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { WalletLayoutComponent } from './wallet-layout/wallet-layout.component';
import { NbLayoutModule, NbSidebarModule } from "@nebular/theme";
import { HomePageLayoutComponent } from './home-page-layout/home-page-layout.component';
import { TestComponent } from "../components/test/test.component";


@NgModule({
  declarations: [
    WalletLayoutComponent,
    HomePageLayoutComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NbLayoutModule,
    NbSidebarModule
  ]
})
export class LayoutModule { }
