import { Component, OnInit } from '@angular/core';
import { Wallet } from 'ethers';
import { WalletService } from "../services/wallet/wallet.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent implements OnInit {

  mnemonic: string[];
  wallet: Wallet;
  stepIndex: number = 0;
  password: string;
  loading: boolean;


  constructor(private walletService: WalletService,
              private router: Router) { }

  ngOnInit(): void {
  }





  createWallet() {
    //only create the wallet if it hasn't already been created
    if (this.wallet == undefined) {
      this.wallet = this.walletService.createNewWallet();
      this.mnemonic = this.wallet.mnemonic.phrase.split(' ');
    }

  }

  //encrypts wallet using password provided by the user and saves it in local storage
  async encryptWallet() {
    await this.walletService.encryptWallet(this.wallet, this.password);
  }



  onPasswordSubmit(password: string) {
    this.password = password;
  }



  async complete_wallet_setup() {
    try {
      this.loading = true;

      await this.encryptWallet();
      this.saveFirstAccount();
      this.walletService.initWallet(this.wallet);
      await this.router.navigate(['wallet/dashboard']);

      this.loading = false;
    } catch (err: any) {
      console.log(err.message);
    }
  }


  nextStep() {
    this.stepIndex++;
  }



  saveFirstAccount() {
    // HD index path in the localstorage
    const accounts = {
      'Account 1': 0
    };

    localStorage.setItem('accounts', JSON.stringify(accounts));
  }

}
