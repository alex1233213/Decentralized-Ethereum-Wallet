import { Component, OnInit } from '@angular/core';
import { WalletService } from "../../services/wallet/wallet.service";
import { BigNumber, utils, Wallet } from "ethers";
import { BalanceService } from "../../services/balance/balance.service";
import { testData } from "../../shared/utils/test_data/cgTestData";
import { CoinGeckoService } from "../../services/coinGecko/coin-gecko.service";
import { Token } from "../../shared/utils/types/Token";
import { Network } from "@ethersproject/networks";
import { Router } from "@angular/router";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  wallet: Wallet;
  tokensData: Token[];
  loadingData: boolean;
  coinGeckoData: Token[];
  coin_balances: any = {};
  network: Network;
  gasPrice: any;
  current_route: string;


  constructor(private walletService: WalletService,
              private balanceService: BalanceService,
              private coinGeckoService: CoinGeckoService,
              private router: Router) { }

  ngOnInit(): void {
    this.current_route = this.router.url;

    // ************************ RELEASE CODE*******************************
    //get the data from coingecko
    // this.coinGeckoService.getTokensData().subscribe( (data: Token[]) => {
    // this.loadingData = true;
    //   this.coinGeckoData = data
    //   console.log(this.coinGeckoData);
    // this.loadingData = false;
    // });
    // ************************  // // // //********************************


    this.walletService.getWallet().subscribe(  (wallet: Wallet) => {
      this.loadingData = true;
      this.wallet = wallet;
      this.wallet.provider.getGasPrice().then( (gasPrice: BigNumber) => {
        // console.log(gasPrice);
        this.gasPrice = gasPrice;
      });

      this.wallet.provider.getNetwork().then( (network: Network) => {

        //get the funds for the wallet on the network
        this.balanceService.getWalletFunds(this.wallet).then( (funds: any) => {
          this.coin_balances = funds;
          this.formatData(network);
          this.loadingData = false;
        });
      });
    });
  }


  formatData(network: Network) {
    if(network.name == 'homestead') {
      this.tokensData = testData; // ***** TODO - REPLACE WITH DATA FROM API
      this.tokensData.forEach( (token: Token) => token.balance = this.coin_balances[token.id]);
    } else if (network.name == 'ropsten') {
      this.tokensData = [
        {
          id: 'ethereum',
          name: 'ROP Ether',
          symbol: 'ROP',
          balance: this.coin_balances['ethereum']
        }
      ];
    } else if (network.name == 'rinkeby') {
      this.tokensData = [
        {
          id: 'ethereum',
          name: 'RIN Ether',
          symbol: 'RIN',
          balance: this.coin_balances['ethereum']
        }
      ];
    }
  }

}
