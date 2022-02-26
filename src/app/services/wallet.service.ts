import { Injectable } from '@angular/core';
import { ethers, Wallet } from 'ethers';
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class WalletService {

  wallet: Wallet | null;
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
  }


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
      // this.infuraProvider = ethers.getDefaultProvider(, {
      //   infura: 'https://mainnet.infura.io/v3/50b428ebbcf94488bb99440fc44e6c08'
      // });

      this.infuraProvider = new ethers.providers.InfuraProvider('homestead',
        'https://mainnet.infura.io/v3/50b428ebbcf94488bb99440fc44e6c08');

      if(keystore) {
        const wallet = await Wallet.fromEncryptedJson(keystore, password);
        this.wallet = wallet.connect(this.infuraProvider);
        console.log(this.wallet);
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

}
