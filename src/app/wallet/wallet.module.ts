import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SendTransactionComponent } from './send-transaction/send-transaction.component';
import { SwapComponent } from './swap/swap.component';
import { DappsComponent } from './dapps/dapps.component';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbMenuModule,
  NbSelectModule, NbSpinnerModule,
  NbTreeGridModule
} from "@nebular/theme";
import { SelectNetworkComponent } from './select-network/select-network.component';
import { TokensComponent } from './tokens/tokens.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

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
    NbCardModule,
    NbTreeGridModule,
    HttpClientModule,
    NbInputModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbSpinnerModule
  ]
})
export class WalletModule { }
