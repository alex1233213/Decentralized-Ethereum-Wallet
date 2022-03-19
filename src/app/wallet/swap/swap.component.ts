import { Component, OnInit } from '@angular/core';
import {WalletService} from "../../services/wallet/wallet.service";
import {Network} from "@ethersproject/networks";
import {Wallet} from "ethers";

@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.css']
})
export class SwapComponent implements OnInit {

  network: Network;
  wallet: Wallet;
  loading_data: boolean;

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.walletService.getWallet().subscribe( (wallet) => {
      this.loading_data = true;

      this.wallet = wallet;
      wallet.provider.getNetwork().then( network => this.network = network);

      this.loading_data = false;
    });
  }

}
