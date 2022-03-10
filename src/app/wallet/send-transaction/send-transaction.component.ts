import {Component, OnInit} from '@angular/core';
import {WalletService} from "../../services/wallet/wallet.service";
import {Wallet} from "ethers";
import {BalanceService} from "../../services/balance/balance.service";
import {CoinGeckoService} from "../../services/coinGecko/coin-gecko.service";
import {testData} from "../../shared/utils/cgTestData";

@Component({
  selector: 'app-send-transaction',
  templateUrl: './send-transaction.component.html',
  styleUrls: ['./send-transaction.component.css']
})
export class SendTransactionComponent implements OnInit {

  selected_token_id: string = "basic-attention-token";
  selected_token: any;
  wallet: Wallet;
  coin_balances = {};
  tokensData: any;

  constructor(private walletService: WalletService,
              private balanceService: BalanceService,
              private coinGeckoService: CoinGeckoService) { }

  ngOnInit(): void {
    // ******************  ******************DEVELOPMENT ****************** ******************
    this.selected_token = testData.find( (token: any) => token.id == this.selected_token_id);
  // ************************************// ****************** **********  ******************

    this.walletService.getWallet().subscribe( (wallet: Wallet) => {
      this.wallet = wallet;
      this.wallet.provider.getNetwork().then( (network) => {

        // ****************** DEVELOPMENT ******************
        if(network.name == 'homestead') {
          this.tokensData = testData;

        } else {
          this.tokensData = {};
        }
        // ****************** // ******************




        // ****************** RELEASE ******************
        //   RETRIEVE DATA FROM API ON COMPONENT INIT
        // ****************** // ******************
      });

      this.balanceService.getWalletFunds(this.wallet)
        .then( (funds: any) => {
          this.coin_balances = funds;
        });
    });

  }



  onSelectToken(selectedId: string) {
    this.selected_token_id = selectedId;
    this.selected_token = testData.find((token: any) => token.id == this.selected_token_id);
  }

}
