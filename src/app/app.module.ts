import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbStepperModule, NbCheckboxModule, NbAlertModule, NbSpinnerModule, NbSidebarModule, NbDialogModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CreateWalletComponent } from './components/create-wallet/create-wallet.component';
import { CreatePasswordComponent } from './components/create-wallet/create-password/create-password.component';
import { ReactiveFormsModule } from "@angular/forms";
import { WalletConfirmationComponent } from './components/create-wallet/wallet-confirmation/wallet-confirmation.component';
import { DisplayMnemonicComponent } from './components/create-wallet/display-mnemonic/display-mnemonic.component';
import { VerifyMnemonicComponent } from './components/create-wallet/verify-mnemonic/verify-mnemonic.component';
import { AccessWalletComponent } from './components/access-wallet/access-wallet.component';
import { RestoreWalletComponent } from './components/restore-wallet/restore-wallet.component';

@NgModule({
    declarations: [
        AppComponent,
        CreateWalletComponent,
        CreatePasswordComponent,
        WalletConfirmationComponent,
        DisplayMnemonicComponent,
        VerifyMnemonicComponent,
        AccessWalletComponent,
        RestoreWalletComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({name: 'default'}),
        NbLayoutModule,
        NbEvaIconsModule,
        NbInputModule,
        ReactiveFormsModule,
        NbCardModule,
        NbButtonModule,
        NbStepperModule,
        NbCheckboxModule,
        NbAlertModule,
        NbSpinnerModule,
        NbSidebarModule.forRoot(),
        NbDialogModule.forRoot(),
    ],
    providers: [],
    exports: [
        AccessWalletComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
