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
  mnemonic: string[] = "tomato snack album rule blush pistol shoulder pole ship design inhale suffer".split(" ");
  stepIndex: number = 3;
  password: string;
  walllet_verified: boolean;


  constructor(private walletService: WalletService) { }

  ngOnInit(): void {

  }





  createWallet() {
    //only create the wallet if it hasn't already been created
    // if(this.wallet == undefined) {
    //   this.wallet = this.walletService.createNewWallet();
    //   this.mnemonic = this.wallet.mnemonic.phrase.split(' ');
    // }

    // this.encryptWallet();

    console.log('create wallet function');
  }

  //encrypts wallet using password provided by the user and saves it in local storage
  async encryptWallet() {
    const keystore = await this.wallet.encrypt(this.password);
    localStorage.setItem('keystore', keystore);
  }




  onPasswordSubmit(password: string) {
    this.password = password;
  }



  complete_wallet_setup() {
    localStorage.setItem('wallet_verified', 'true');
    this.nextStep();
    console.log('navigating');
  }


  nextStep() {
    this.stepIndex++;
  }

}
