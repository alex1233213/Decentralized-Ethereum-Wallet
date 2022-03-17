import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SendTransactionComponent } from './send-transaction/send-transaction.component';
import { SwapComponent } from './swap/swap.component';
import { DappsComponent } from './dapps/dapps.component';
import {
  NbButtonModule,
  NbCardModule, NbIconModule,
  NbInputModule, NbListModule,
  NbMenuModule,
  NbSelectModule, NbSpinnerModule,
  NbTreeGridModule
} from "@nebular/theme";
import { SelectNetworkComponent } from './select-network/select-network.component';
import { TokensComponent } from './tokens/tokens.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { SendTxFormComponent } from './send-transaction/send-tx-form/send-tx-form.component';
import { ConfirmTxDialogComponent } from './dialogs/confirm-tx-dialog/confirm-tx-dialog.component';
import { SelectAccountComponent } from './select-account/select-account.component';
import { NewAccDialogComponent } from './dialogs/new-acc-dialog/new-acc-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SendTransactionComponent,
    SwapComponent,
    DappsComponent,
    SelectNetworkComponent,
    TokensComponent,
    SendTxFormComponent,
    ConfirmTxDialogComponent,
    SelectAccountComponent,
    NewAccDialogComponent
  ],
    exports: [
        SelectNetworkComponent,
        SelectAccountComponent
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
    NbSpinnerModule,
    NbIconModule,
    NbListModule
  ]
})
export class WalletModule { }
