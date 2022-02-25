import { Component } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { WalletService } from "../services/wallet.service";
import { Wallet } from "ethers";
import { Router } from "@angular/router";

@Component({
  selector: 'app-restore-wallet',
  templateUrl: './restore-wallet.component.html',
  styleUrls: ['./restore-wallet.component.css']
})
export class RestoreWalletComponent {

  mnemonic = new FormControl('', [Validators.required]);
  index: number = 0;
  mnemonic_err: string;
  loading: boolean;

  constructor(private walletService: WalletService,
              private router: Router) { }


  //method verifies mnemonic entered by the user
  verifyMnemonic() {
    const error = this.walletService.restoreFromMnemonic(this.mnemonic.value);

    if(error != undefined) {
      this.mnemonic_err = error;
    } else {
      this.nextStep();
    }
  }



  async encryptWallet(password: string) {
    this.loading = true;
    await this.walletService.encryptWallet(password);

    //after the wallet is encrypted, redirect user to dashboard
    this.router.navigate(['/wallet']);
    this.loading = false;
  }

  nextStep() {
     this.index++;
  }
}
