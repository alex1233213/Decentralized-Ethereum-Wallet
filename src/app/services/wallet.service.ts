import { Injectable } from '@angular/core';
import { ethers, Wallet } from 'ethers';

@Injectable({
  providedIn: 'root'
})

export class WalletService {

  wallet: Wallet;
  provider: ethers.providers.BaseProvider;

  constructor() { }


  createNewWallet(): Wallet {
    return ethers.Wallet.createRandom();
  }


  //method restores wallet from mnemonic if valid mnemonic
  //if invalid mnemonic returns error message
  restoreFromMnemonic(mnemonic: string) {
    try {
      this.wallet = ethers.Wallet.fromMnemonic(mnemonic);
    } catch (err: any) {
      return err.message;
    }
  }



  async accessWallet(password: string) {
    try {
      const keystore = localStorage.getItem('keystore');
      this.provider = ethers.getDefaultProvider('ropsten');

      if(keystore) {
        const wallet = await Wallet.fromEncryptedJson(keystore, password);
        this.wallet = wallet.connect(this.provider);
        console.log(this.wallet);
      }

    } catch (err: any) {
      throw new Error(err);
    }
  }


  async encryptWallet(password: string) {
    const keystore = await this.wallet.encrypt(password);
    localStorage.setItem('keystore', keystore);
  }

}
