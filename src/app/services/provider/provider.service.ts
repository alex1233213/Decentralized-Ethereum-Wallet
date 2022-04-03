import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import { WalletService } from "../wallet/wallet.service";


@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private provider: ethers.providers.InfuraProvider;

  constructor(private walletService: WalletService) {
    this.provider = new ethers.providers.InfuraProvider('homestead',
      '50b428ebbcf94488bb99440fc44e6c08');
  }




  changeProvider(provider: string) {
    return new Promise( (resolve => {
      try {
        this.provider = new ethers.providers.InfuraProvider(provider,
          '50b428ebbcf94488bb99440fc44e6c08');

        this.walletService.connectToProvider(this.provider);
        resolve(null);
      } catch (e) {
        console.log(e);
      }
    }));


  }

}
