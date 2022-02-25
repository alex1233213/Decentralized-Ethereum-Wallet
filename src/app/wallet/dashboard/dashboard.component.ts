import { Component, OnInit } from '@angular/core';
import { Network } from '@ethersproject/networks';
import { WalletService } from "../../services/wallet.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  address: string;
  network: Network;

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.address = this.walletService.wallet.address;
  }

}
