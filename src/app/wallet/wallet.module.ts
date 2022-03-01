import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SendTransactionComponent } from './send-transaction/send-transaction.component';
import { SwapComponent } from './swap/swap.component';
import { DappsComponent } from './dapps/dapps.component';
import { NbCardModule, NbMenuModule, NbSelectModule } from "@nebular/theme";
import { SelectNetworkComponent } from './select-network/select-network.component';
import { TokensComponent } from './tokens/tokens.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SendTransactionComponent,
    SwapComponent,
    DappsComponent,
    SelectNetworkComponent,
    TokensComponent
  ],
  exports: [
    SelectNetworkComponent
  ],
  imports: [
    CommonModule,
    NbMenuModule,
    NbSelectModule,
    NbCardModule
  ]
})
export class WalletModule { }
