import { Injectable } from '@angular/core';
import { ethers, Wallet } from 'ethers';

@Injectable({
  providedIn: 'root'
})

export class WalletService {

  wallet: Wallet;

  constructor() { }


  createNewWallet(): Wallet {
    return ethers.Wallet.createRandom();
  }



  restoreFromMnemonic(mnemonic: string) {
      return ethers.Wallet.fromMnemonic(mnemonic);
  }



  async accessWallet(password: string) {
    try {
      const keystore = localStorage.getItem('keystore');

      if(keystore) {
        this.wallet = await Wallet.fromEncryptedJson(keystore, password);
        console.log(this.wallet);
      }

    } catch (err: any) {
      throw new Error(err);
    }
  }

}
