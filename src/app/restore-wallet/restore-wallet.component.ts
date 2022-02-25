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
  wallet: Wallet;
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
    const keystore = await this.wallet.encrypt(password);
    localStorage.setItem('keystore', keystore);

    //after the wallet is encrypted,
    // redirect to the dashboard with the restored wallet
    this.walletService.setWallet(this.wallet);
    this.router.navigate(['/wallet']);
    this.loading = false;
  }

  nextStep() {
     this.index++;
  }
}
