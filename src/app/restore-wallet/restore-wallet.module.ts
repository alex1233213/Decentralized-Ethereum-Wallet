import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreWalletRoutingModule } from './restore-wallet-routing.module';
import { RestoreWalletComponent } from './restore-wallet.component';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
  NbStepperModule
} from "@nebular/theme";
import { ReactiveFormsModule } from "@angular/forms";
import { CreateWalletModule } from "../create-wallet/create-wallet.module";

@NgModule({
  declarations: [
    RestoreWalletComponent
  ],
    imports: [
        CommonModule,
        RestoreWalletRoutingModule,
        NbStepperModule,
        NbCardModule,
        ReactiveFormsModule,
        NbInputModule,
        NbButtonModule,
        CreateWalletModule,
        NbSpinnerModule,
        NbIconModule,
        NbAlertModule
    ]
})
export class RestoreWalletModule { }
