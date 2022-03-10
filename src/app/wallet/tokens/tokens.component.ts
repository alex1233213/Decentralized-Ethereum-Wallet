import { Component, OnInit } from '@angular/core';
import { CoinGeckoService } from "../../services/coinGecko/coin-gecko.service";
import { BalanceService } from "../../services/balance/balance.service";
import { testData } from "../../shared/utils/cgTestData";
import { Wallet } from "ethers";
import { Network } from "@ethersproject/networks";
import { WalletService } from "../../services/wallet/wallet.service";


@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {

  tokensData: any [];
  ethBalance: string;
  coin_balances: any = {};
  wallet: Wallet;
  network: any;

  columns = ['TOKEN', 'PRICE', 'MARKET CAP', '24H', 'BALANCE'];

  constructor(private coinGeckoService: CoinGeckoService,
              private balanceService: BalanceService,
              private walletService: WalletService) {
  }

  async ngOnInit(): Promise<any> {

    //******************** RELEASE ***********************
    // this.coinGeckoService.getTokensData().subscribe(
    //   (data) => console.log(data));

    //get the balances of the other tokens
    //this.erc_20_tokens_balances = await this.balanceService.readErc20TokensBalance(this.wallet);
    //****************************************************

    this.walletService.getWallet().subscribe( async (wallet) => {
      this.wallet = wallet;
      this.ethBalance = await this.balanceService.readEtherBalance(this.wallet);
      this.coin_balances['ethereum'] = this.ethBalance;
      wallet.provider.getNetwork().then((n: Network) => {
        this.network = n
        this.getERC20Balances();
      });
    });

    this.tokensData = testData;
  }


  //retrieve the ERC-20 tokens balances if the wallet is connected to the main net
  getERC20Balances() {
    if(this.network.name == "homestead") {
      // **** /// ***/// // **** /// ***///
      const erc_20_tokens_balances = {
        "basic-attention-token": "0.0",
        "the-sandbox": "0.0",
        "usd-coin": "15.0"
      } //******
      // **** /// ***/// // **** /// ***///

      for (const [coin, balance] of Object.entries(erc_20_tokens_balances)) {
        this.coin_balances[coin] = balance;
      }
    }
  }

}
