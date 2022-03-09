import { Injectable } from '@angular/core';
import { ethers, Wallet } from 'ethers';
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { Network } from "@ethersproject/networks";

@Injectable({
  providedIn: 'root'
})

export class WalletService {

  wallet: any;
  infuraProvider: ethers.providers.InfuraProvider;

  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((event) => {
        // @ts-ignore
        if( !(event.url.includes('/wallet/')) ) {
          this.wallet = null;
        }
    });

    // **************************** TO BE REMOVED ****************************
    const wallet = this.restoreFromMnemonic('tomato snack album rule blush pistol shoulder pole ship design inhale suffer');
    this.infuraProvider = new ethers.providers.InfuraProvider('ropsten',
      '50b428ebbcf94488bb99440fc44e6c08');

    this.wallet = wallet.connect(this.infuraProvider);
    // ***********************************************************************
  }


  createNewWallet(): Wallet {
    return ethers.Wallet.createRandom();
  }


  //method restores wallet from mnemonic if valid mnemonic
  //if invalid mnemonic returns error message
  restoreFromMnemonic(mnemonic: string) {
    try {
      // ***** final code *****
      // this.wallet = ethers.Wallet.fromMnemonic(mnemonic);
      // **********************
      return ethers.Wallet.fromMnemonic(mnemonic);

    } catch (err: any) {
      return err.message;
    }
  }



  async accessWallet(password: string) {
    try {
      const keystore = localStorage.getItem('keystore');
      // this.infuraProvider = ethers.getDefaultProvider(, {
      //   infura: 'https://mainnet.infura.io/v3/50b428ebbcf94488bb99440fc44e6c08'
      // });

      this.infuraProvider = new ethers.providers.InfuraProvider('ropsten',
        '50b428ebbcf94488bb99440fc44e6c08');

      if(keystore) {
        const wallet = await Wallet.fromEncryptedJson(keystore, password);
        this.wallet = wallet.connect(this.infuraProvider);
        // console.log(this.wallet);
      }

    } catch (err: any) {
      throw new Error(err);
    }
  }


  async encryptWallet(password: string) {
    if(this.wallet != null) {
      const keystore = await this.wallet.encrypt(password);
      localStorage.setItem('keystore', keystore);
    }
  }


  connectToProvider(provider: ethers.providers.InfuraProvider) {
    this.wallet = this.wallet.connect(provider);
    this.wallet.provider.getNetwork().then( (n: Network) => console.log(n));
  }
}
