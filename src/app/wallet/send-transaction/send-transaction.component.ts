import { Component, OnInit } from '@angular/core';
import { WalletService } from "../../services/wallet/wallet.service";
import { BigNumber, utils, Wallet } from "ethers";
import { BalanceService } from "../../services/balance/balance.service";
import { testData } from "../../shared/utils/cgTestData";
import { CoinGeckoService } from "../../services/coinGecko/coin-gecko.service";
import { Token } from "../../shared/utils/types/Token";
import { Network } from "@ethersproject/networks";

@Component({
  selector: 'app-send-transaction',
  templateUrl: './send-transaction.component.html',
  styleUrls: ['./send-transaction.component.css']
})
export class SendTransactionComponent implements OnInit {

  wallet: Wallet;
  tokensData: Token[];
  loadingData: boolean;
  coinGeckoData: Token[];
  coin_balances: any = {};
  network: Network;
  gasPrice: any;


  constructor(private walletService: WalletService,
              private balanceService: BalanceService,
              private coinGeckoService: CoinGeckoService) { }

  ngOnInit(): void {
    // ************************ RELEASE CODE*******************************
    //get the data from coingecko
    // this.coinGeckoService.getTokensData().subscribe( (data: Token[]) => {
    //   this.coinGeckoData = data
    //   console.log(this.coinGeckoData);
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






  // sendTransaction() {
  //   //  **** RELEASE ****
  //   // const recipient = this.send_transaction_form.get('receiving_address')!.value;
  //   // const send_amount = this.send_transaction_form.get('send_amount')!.value;
  //   // ***** // ***** // ***** //
  //
  //
  //   // **** DEVELOPMENT ****
  //   const send_amount = '0.0001';
  //   // ***** // ***** // ***** //
  //
  //   const recipient = '0xb28C2c433a9831f983bbCE7312D63694A2E1E2b8';
  //   console.log(recipient);
  //   console.log(send_amount);
  //
  //   const tx = {
  //     from: this.wallet.address,
  //     to: recipient,
  //     value: utils.parseUnits(send_amount, 'ether'),
  //     gasPrice: this.gasPrice
  //   };
  // }





}
