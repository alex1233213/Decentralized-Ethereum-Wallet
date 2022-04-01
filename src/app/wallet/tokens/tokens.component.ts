import { Component, OnInit } from '@angular/core';
import { CoinGeckoService } from "../../services/coinGecko/coin-gecko.service";
import { BalanceService } from "../../services/balance/balance.service";
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

    this.coinGeckoService.getTokensData().subscribe(
      (data) => this.tokensData = data);

    this.walletService.getWallet().subscribe( async (wallet: Wallet) => {
      this.loadingData = true;

      this.wallet = wallet;
      this.ethBalance = await this.balanceService.readEtherBalance(this.wallet);
      this.coin_balances['ethereum'] = this.ethBalance;
      await this.getERC20Balances();
      wallet.provider.getNetwork().then((n: Network) => this.network = n);

      this.loadingData = false;
    });

  }


  //retrieve the ERC-20 tokens balances if the wallet is connected to the main net
  async getERC20Balances() {
    const erc_20_tokens_balances = await this.balanceService.readErc20TokensBalance(this.wallet);

    for (const [coin, balance] of Object.entries(erc_20_tokens_balances)) {
      this.coin_balances[coin] = balance;
    }
  }

}
