import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import { WalletService } from "../wallet/wallet.service";

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  provider: ethers.providers.InfuraProvider;

  constructor(private walletService: WalletService) {
    // this.provider = new ethers.providers.InfuraProvider('ropsten',
    //   '50b428ebbcf94488bb99440fc44e6c08');

  }


  changeProvider(provider: string) {
      this.provider = new ethers.providers.InfuraProvider(provider,
        '50b428ebbcf94488bb99440fc44e6c08');

      this.walletService.connectToProvider(this.provider);
  }

}
