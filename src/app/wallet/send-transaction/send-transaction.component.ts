import { Component, OnInit } from '@angular/core';
import { WalletService } from "../../services/wallet/wallet.service";
import { Wallet } from "ethers";
import { BalanceService } from "../../services/balance/balance.service";
import { testData } from "../../shared/utils/cgTestData";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { sendAmountValidator } from "../../shared/validators/sendAmountValidator";
import { addressValidator } from "../../shared/validators/addressValidator";
import { CoinGeckoService } from "../../services/coinGecko/coin-gecko.service";
import { Token } from "../../shared/utils/Token";
import { Network } from "@ethersproject/networks";

@Component({
  selector: 'app-send-transaction',
  templateUrl: './send-transaction.component.html',
  styleUrls: ['./send-transaction.component.css']
})
export class SendTransactionComponent implements OnInit {

  selected_token: Token;
  wallet: Wallet;
  tokensData: any;
  loadingData: boolean;
  send_transaction_form: FormGroup;
  coinGeckoData: Token[];
  coin_balances: any = {};
  network: Network;


  constructor(private walletService: WalletService,
              private balanceService: BalanceService,
              private coinGeckoService: CoinGeckoService) { }

  ngOnInit(): void {
    this.loadingData = true;

    // ************************ RELEASE CODE*******************************
    //get the data from coingecko
    // this.coinGeckoService.getTokensData().subscribe( (data: Token[]) => {
    //   this.coinGeckoData = data
    //   console.log(this.coinGeckoData);
    // });
    // ************************  // // // //********************************



    this.walletService.getWallet().subscribe( (wallet: Wallet) => {
      this.wallet = wallet;
      this.wallet.provider.getNetwork().then( (network: Network) => {

        //get the funds for the wallet on the network
        this.balanceService.getWalletFunds(this.wallet).then( (funds: any) => {
          this.coin_balances = funds;
          this.loadingData = false;
          this.initialiseForm();
        });

        this.checkNetwork(network);
      });
    });

  }


  checkNetwork(network: Network) {
    if(network.name == 'homestead') {
      this.tokensData = testData; // ***** TODO - REPLACE WITH DATA FROM API

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

    //reset the selected token
    this.selected_token = this.tokensData[0];
  }



  initialiseForm() {
    this.send_transaction_form = new FormGroup({
      selected_token: new FormControl(this.selected_token),
      send_amount: new FormControl('',
        [Validators.required]),
      receiving_address: new FormControl('', [ Validators.required, addressValidator()] )
    }, { validators: sendAmountValidator(this.coin_balances) });
  }




  next() {
    console.log(this.send_transaction_form.value);
  }


  get send_amount_edited() {
    return this.send_transaction_form.get('send_amount')?.touched
      ||
      this.send_transaction_form.get('send_amount')?.dirty;
  }


  get receiving_address() {
    return this.send_transaction_form.get('receiving_address')!;
  }

}
