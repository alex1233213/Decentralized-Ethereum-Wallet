import {Component, Input, OnInit} from '@angular/core';
import { CoinGeckoService } from "../../services/coinGecko/coin-gecko.service";
import { BalanceService } from "../../services/balance/balance.service";
import { testData } from "../../shared/utils/cgTestData";
import {Wallet} from "ethers";


@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {

  tokensData: any [];
  ethBalance: string;
  @Input() wallet: Wallet;
  @Input() network: any;

  columns = ['TOKEN', 'PRICE', 'MARKET CAP', '24H', 'BALANCE'];

  constructor(private coinGeckoService: CoinGeckoService,
              private balanceService: BalanceService) {
  }

  async ngOnInit(): Promise<any> {

    //******************** RELEASE ***********************
    // this.coinGeckoService.getTokensData().subscribe(
    //   (data) => console.log(data));
    //****************************************************
    this.tokensData = testData;
    this.ethBalance = await this.balanceService.readBalance(this.wallet);

  }

}
