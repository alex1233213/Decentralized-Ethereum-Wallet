import { Component, OnInit } from '@angular/core';
import { Wallet } from 'ethers';
import { WalletService } from "../../services/wallet.service";




@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent implements OnInit {
  wallet: Wallet;
  mnemonic: string[];
  stepIndex: number = 0;
  password: string;


  constructor(private walletService: WalletService) { }

  ngOnInit(): void {

  }





  createWallet() {
    //only create the wallet if it hasn't already been created
    if(this.wallet == undefined) {
      this.wallet = this.walletService.createNewWallet();
      this.mnemonic = this.wallet.mnemonic.phrase.split(' ');

      this.encryptWallet();
    }


  }

  //encrypts wallet using password provided by the user and saves it in local storage
  async encryptWallet() {
    const keystore = await this.wallet.encrypt(this.password);
    localStorage.setItem('keystore', keystore);
  }




  onPasswordSubmit(password: string) {
    this.password = password;
    this.nextStep();
  }



  navigateToDashboard() {
    console.log('navigating');
  }


  nextStep() {
    this.stepIndex++;
  }

  previousStep() {
    this.stepIndex--;
  }

}
