import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SendTransactionComponent } from './send-transaction/send-transaction.component';
import { SwapComponent } from './swap/swap.component';
import { DappsComponent } from './dapps/dapps.component';
import { NbMenuModule, NbSelectModule } from "@nebular/theme";
import { SelectNetworkComponent } from './select-network/select-network.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SendTransactionComponent,
    SwapComponent,
    DappsComponent,
    SelectNetworkComponent
  ],
  exports: [
    SelectNetworkComponent
  ],
  imports: [
    CommonModule,
    NbMenuModule,
    NbSelectModule
  ]
})
export class WalletModule { }
