import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateWalletRoutingModule } from './create-wallet-routing.module';
import { CreateWalletComponent } from './create-wallet.component';
import { CreatePasswordComponent } from "./create-password/create-password.component";
import { DisplayMnemonicComponent } from "./display-mnemonic/display-mnemonic.component";
import { VerifyMnemonicComponent } from "./verify-mnemonic/verify-mnemonic.component";
import { WalletConfirmationComponent } from "./wallet-confirmation/wallet-confirmation.component";
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbStepperModule
} from "@nebular/theme";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        CreateWalletComponent,
        CreatePasswordComponent,
        DisplayMnemonicComponent,
        VerifyMnemonicComponent,
        WalletConfirmationComponent
    ],
    exports: [
        CreatePasswordComponent
    ],
    imports: [
        CommonModule,
        CreateWalletRoutingModule,
        NbCardModule,
        NbStepperModule,
        ReactiveFormsModule,
        NbAlertModule,
        NbCheckboxModule,
        NbButtonModule,
        NbInputModule
    ]
})
export class CreateWalletModule { }
