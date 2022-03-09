import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private provider$: BehaviorSubject<ethers.providers.InfuraProvider>;

  constructor() {
    // this.provider = new ethers.providers.InfuraProvider('ropsten',
    //   '50b428ebbcf94488bb99440fc44e6c08');

    //when the service is created, the default provider is for mainnet
    const walletProvider = new ethers.providers.InfuraProvider("homestead",
      '50b428ebbcf94488bb99440fc44e6c08');

    //****
    this.provider$ = new BehaviorSubject<ethers.providers.InfuraProvider>(walletProvider);
  }

  getProvider(): Observable<ethers.providers.InfuraProvider> {
    return this.provider$.asObservable();
  }

  //*********
  changeProvider(provider: string) {
      this.provider$.next(new ethers.providers.InfuraProvider(provider,
        '50b428ebbcf94488bb99440fc44e6c08'));
  }
  //*********


  // changeProvider(provider: string) {
  //     this.provider = new ethers.providers.InfuraProvider(provider,
  //       '50b428ebbcf94488bb99440fc44e6c08');
  //
  //     this.walletService.connectToProvider(this.provider);
  // }

}
