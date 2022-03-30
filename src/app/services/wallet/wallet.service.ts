import { Injectable } from '@angular/core';
import { ethers, Wallet } from 'ethers';
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, filter, Observable } from "rxjs";
import { ProviderService } from "../provider/provider.service";

@Injectable({
  providedIn: 'root'
})

export class WalletService {

  private wallet: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  infuraProvider: ethers.providers.InfuraProvider;

  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((event) => {
        // @ts-ignore
        if( !(event.url.includes('/wallet/')) ) {
          this.wallet.next(null);
        }
    });

    // **************************** TO BE REMOVED ****************************
    // const wallet = this.restoreFromMnemonic('tomato snack album rule blush pistol shoulder pole ship design inhale suffer');
    // this.infuraProvider = new ethers.providers.InfuraProvider('ropsten',
    //   '50b428ebbcf94488bb99440fc44e6c08');
    //
    // this.connectToProvider(wallet);
    // ***********************************************************************

  }


  getWallet(): Observable<Wallet> {
    return this.wallet.asObservable();
  }




  reloadWallet(wallet: Wallet) {
    this.wallet.next(wallet.connect(this.infuraProvider));
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
      // this.reloadWallet()
      return ethers.Wallet.fromMnemonic(mnemonic);

    } catch (err: any) {
      return err.message;
    }
  }



  async accessWallet(password: string) {
    try {
      const keystore = localStorage.getItem('keystore');

      this.infuraProvider = new ethers.providers.InfuraProvider('homestead',
        '50b428ebbcf94488bb99440fc44e6c08');

      if(keystore) {
        const wallet = await Wallet.fromEncryptedJson(keystore, password);
        this.wallet.next(wallet.connect(this.infuraProvider));
      }

    } catch (err: any) {
      throw new Error(err);
    }
  }


  async encryptWallet(wallet: Wallet, password: string) {
      const keystore = await wallet.encrypt(password);
      localStorage.setItem('keystore', keystore);
  }



  initWallet(wallet: Wallet) {
    const provider = new ethers.providers.InfuraProvider("homestead",
      '50b428ebbcf94488bb99440fc44e6c08');

    this.wallet.next(wallet.connect(provider));
  }


  // method to connect the wallet to the provider passed in
  connectToProvider(provider: ethers.providers.InfuraProvider) {
    const wallet = this.wallet.value.connect(provider);
    this.wallet.next(wallet);
    // console.log(this.wallet.value);
  }

}
