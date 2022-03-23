import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DappsComponent } from './dapps/dapps.component';
import {
  NbAlertModule,
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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmTxDialogComponent } from './dialogs/confirm-tx-dialog/confirm-tx-dialog.component';
import { SelectAccountComponent } from './select-account/select-account.component';
import { NewAccDialogComponent } from './dialogs/new-acc-dialog/new-acc-dialog.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { RouterModule } from "@angular/router";
import { SendTxFormComponent } from "./transactions/send-tx-form/send-tx-form.component";
import { SwapFormComponent } from "./transactions/swap-form/swap-form.component";
import { SelectTokenComponent } from './ui/select-token/select-token.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DappsComponent,
    SelectNetworkComponent,
    TokensComponent,
    ConfirmTxDialogComponent,
    SelectAccountComponent,
    NewAccDialogComponent,
    TransactionsComponent,
    SendTxFormComponent,
    SwapFormComponent,
    SelectTokenComponent
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
    NbListModule,
    FormsModule,
    NbAlertModule,
    RouterModule
  ]
})
export class WalletModule { }
