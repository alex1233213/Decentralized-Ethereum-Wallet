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
  loadingData: boolean;

  constructor(private coinGeckoService: CoinGeckoService,
              private balanceService: BalanceService,
              private walletService: WalletService) {
  }

  async ngOnInit(): Promise<any> {
    //******************** RELEASE ***********************
    // this.coinGeckoService.getTokensData().subscribe(
    //   (data) => console.log(data));

    //get the balances of the other tokens

    //****************************************************

    this.walletService.getWallet().subscribe( async (wallet: Wallet) => {
      this.loadingData = true;

      this.wallet = wallet;
      this.ethBalance = await this.balanceService.readEtherBalance(this.wallet);
      this.coin_balances['ethereum'] = this.ethBalance;
      this.getERC20Balances();
      wallet.provider.getNetwork().then((n: Network) => this.network = n);

      this.loadingData = false;
    });

    this.tokensData = testData; // TODO - FETCH DATA FROM API
  }


  //retrieve the ERC-20 tokens balances if the wallet is connected to the main net
  getERC20Balances() {

    /// ***** /// *****/// ***** RELEASE /// *****/// *****
    //this.erc_20_tokens_balances = await this.balanceService.readErc20TokensBalance(this.wallet);
    /// *****/// *****/// *****/// *****/// *****/// *****

    // **** /// ***//TEST DATA// **** /// ***//
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
