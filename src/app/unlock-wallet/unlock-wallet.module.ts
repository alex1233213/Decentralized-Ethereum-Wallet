import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnlockWalletRoutingModule } from './unlock-wallet-routing.module';
import { UnlockWalletComponent } from './unlock-wallet.component';
import { NbAlertModule, NbCardModule, NbInputModule, NbSpinnerModule } from "@nebular/theme";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    UnlockWalletComponent
  ],
  imports: [
    CommonModule,
    UnlockWalletRoutingModule,
    NbAlertModule,
    ReactiveFormsModule,
    NbCardModule,
    NbSpinnerModule,
    NbInputModule
  ]
})
export class UnlockWalletModule { }
