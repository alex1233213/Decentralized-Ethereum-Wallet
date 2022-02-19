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

  constructor(private walletService: WalletService,
              private router: Router) { }


  verifyMnemonic() {
    try {
      this.wallet = this.walletService.restoreFromMnemonic(this.mnemonic.value);
      this.nextStep();
    } catch (err: any) {
      this.mnemonic_err = err.message;
    }
  }



  async encryptWallet(password: string) {
    console.log(password);
    console.log('submit')
    const keystore = await this.wallet.encrypt(password);
    localStorage.setItem('keystore', keystore);

    this.router.navigate(['/wallet/dashboard']);
  }

  nextStep() {
     this.index++;
  }
}
