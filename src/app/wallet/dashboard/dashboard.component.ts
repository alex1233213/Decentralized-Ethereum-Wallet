import { Component, OnInit } from '@angular/core';
import { Network } from '@ethersproject/networks';
import { WalletService } from "../../services/wallet/wallet.service";
import { ethers, Wallet} from "ethers";
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
    console.log(this.wallet);
    this.walletService.wallet.provider.getNetwork().then( (n: Network) => this.network = n);
    this.readBalance();
  }

  async readBalance() {
    // const usdc = new ethers.Contract(
    //   config['address'],
    //   config['abi'],
    //   this.wallet
    // );
    //
    // console.log(this.wallet.address);
    // const usdcBalance = await usdc['balanceOf'](this.wallet.address);
    // console.log(`USDC Balance: ${ethers.utils.formatUnits(usdcBalance, 6)}`);

    const ethBalance = await this.wallet.provider.getBalance('0x603506f9F3C4C8B78ffA39F04797c9Dc216b37B1');
    console.log(`Eth Balance: ${ethers.utils.formatUnits(ethBalance, 18)}`);
    this.balance = ethers.utils.formatUnits(ethBalance, 18);
  }

}
