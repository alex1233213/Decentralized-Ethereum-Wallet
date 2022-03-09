import { Component, OnInit } from '@angular/core';
import { Network } from '@ethersproject/networks';
import { WalletService } from "../../services/wallet/wallet.service";
import { Wallet } from "ethers";
import { config } from "../../shared/utils/config";




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  address: string | undefined;
  network: Network;
  wallet: Wallet;
  balance: string;


  constructor(private walletService: WalletService) {

  }

  ngOnInit(): void {
    this.wallet = this.walletService.wallet;
    this.address = this.walletService.wallet?.address;

    this.walletService.wallet.provider.getNetwork().then( (n: Network) => {this.network = n; console.log(this.network)});
    console.log(this.network);
  }



}
