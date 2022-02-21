import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { WalletRoutingModule } from "./wallet-routing.module";



@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent
  ],
  exports: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    // WalletRoutingModule
  ]
})
export class WalletModule { }
