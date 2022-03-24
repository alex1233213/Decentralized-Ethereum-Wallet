import { Component, OnInit } from '@angular/core';
import Moralis from "moralis";
import {WalletService} from "../../services/wallet/wallet.service";
import {Wallet} from "ethers";

@Component({
  selector: 'app-wallet-layout',
  templateUrl: './wallet-layout.component.html',
  styleUrls: ['./wallet-layout.component.css']
})
export class WalletLayoutComponent implements OnInit {

  wallet_address: string;

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.walletService.getWallet().subscribe( (wallet: Wallet) => {
      wallet.getAddress().then( (address: string) => this.wallet_address = address);
    });
  }


  async buyEther() {
    if(this.wallet_address) {
      await navigator.clipboard.writeText(this.wallet_address);


      // await Moralis.initPlugins();
      //
      // Moralis.Plugins['fiat'].buy();
    }
  }
}
