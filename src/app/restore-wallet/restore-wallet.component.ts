import { Component } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { WalletService } from "../services/wallet/wallet.service";
import { Router } from "@angular/router";
import { Wallet } from "ethers";
import { AccountsService } from "../services/accounts/accounts.service";

@Component({
  selector: 'app-restore-wallet',
  templateUrl: './restore-wallet.component.html',
  styleUrls: ['./restore-wallet.component.css']
})
export class RestoreWalletComponent {

  mnemonic = new FormControl('', [Validators.required]);
  index: number = 0;
  mnemonic_err: string = '';
  wallet_restore_err: string = '';
  loading: boolean;
  wallet: Wallet;

  constructor(private walletService: WalletService,
              private router: Router,
              private accountsService: AccountsService) { }


  //method verifies mnemonic entered by the user
  verifyMnemonic() {
    const return_value =  this.walletService.restoreFromMnemonic(this.mnemonic.value);

    if( typeof return_value == 'string') {
      this.mnemonic_err = return_value;

      setTimeout( () => {
        this.mnemonic_err = '';
      }, 5000);

    } else {
      this.wallet = return_value;
      this.nextStep();
    }
  }


  //save encrypted wallet to localstorage, decrypt the wallet and navigate to dashboard
  async encryptWallet(password: string, wallet: Wallet) {
    this.loading = true;

    try {

      await this.walletService.encryptWallet(wallet, password);
      await this.accountsService.generateFirstAccount(wallet);
      await this.walletService.initWallet(wallet);
      //after the wallet is encrypted, redirect user to dashboard
      await this.router.navigate(['/wallet/dashboard']);

    } catch (err: any) {
      this.wallet_restore_err = err.message;

      setTimeout( () => {
        this.wallet_restore_err = '';
      }, 5000);
    }

    this.loading = false;
  }

  nextStep() {
    this.index++;
  }
}
