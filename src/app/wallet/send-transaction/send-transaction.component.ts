import { Component, OnInit } from '@angular/core';
import { WalletService } from "../../services/wallet/wallet.service";
import { Network } from "@ethersproject/networks";
import { Wallet } from "ethers";
import {BalanceService} from "../../services/balance/balance.service";
import {CoinGeckoService} from "../../services/coinGecko/coin-gecko.service";

@Component({
  selector: 'app-send-transaction',
  templateUrl: './send-transaction.component.html',
  styleUrls: ['./send-transaction.component.css']
})
export class SendTransactionComponent implements OnInit {

  selected_token: string;
  wallet: Wallet;
  coin_balances = {};

  constructor(private walletService: WalletService,
              private balanceService: BalanceService,
              private coinGeckoService: CoinGeckoService) { }

  ngOnInit(): void {
    this.walletService.getWallet().subscribe( (wallet: Wallet) => {
      this.wallet = wallet;

      this.balanceService.getWalletFunds(this.wallet)
        .then( (funds: any) => {
          this.coin_balances = funds;
        });
    });

  }

}
