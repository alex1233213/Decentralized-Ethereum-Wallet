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
    //****************************************************

    this.walletService.getWallet().subscribe( async (wallet) => {
      this.wallet = wallet;
      this.ethBalance = await this.balanceService.readBalance(this.wallet);
      wallet.provider.getNetwork().then((n: Network) => this.network = n);
    });

    this.tokensData = testData;
    this.ethBalance = await this.balanceService.readBalance(this.wallet);
  }

}
