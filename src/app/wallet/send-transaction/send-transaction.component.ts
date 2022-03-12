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
import {Network} from "@ethersproject/networks";

@Component({
  selector: 'app-send-transaction',
  templateUrl: './send-transaction.component.html',
  styleUrls: ['./send-transaction.component.css']
})
export class SendTransactionComponent implements OnInit {

  selected_token_id: string = "basic-attention-token";
  selected_token: any;
  wallet: Wallet;
  tokensData: any;
  loadingData: boolean;
  send_transaction_form: FormGroup;
  coinGeckoData: Token[];
  coin_balances: any = {};



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
    // ************************  RELEASE CODE************************************

    // ******************  ******************DEVELOPMENT ****************** ******************
    this.selected_token = testData.find( (token: any) => token.id == this.selected_token_id);
    // ************************************// ****************** **********  ******************

    // ****** ***** ****** RELEASE  ****** ***** ******  ****** ***** ******
    this.walletService.getWallet().subscribe( (wallet: Wallet) => {
      this.wallet = wallet;
      this.wallet.provider.getNetwork().then( (network: Network) => {

        //get the funds for the wallet on the network
        this.balanceService.getWalletFunds(this.wallet).then( (funds: any) => {
          this.coin_balances = funds;
          console.log(this.coin_balances);

          this.loadingData = false;

          this.initialiseForm();
        });
      // ****** ***** ****** RELEASE  ****** ***** ******  ****** ***** ******


        // ****************** DEVELOPMENT ******************
        if(network.name == 'homestead') {
          this.tokensData = testData;
        } else {
          this.tokensData = [];
        }
        // ****************** // ******************

      });
    });

  }



  initialiseForm() {
    this.send_transaction_form = new FormGroup({
      selected_token: new FormControl(this.selected_token_id),
      send_amount: new FormControl('',
        [Validators.required]),
      receiving_address: new FormControl('', [ Validators.required, addressValidator()] )
    }, { validators: sendAmountValidator(this.coin_balances) });

  }


  onSelectToken(selectedId: string) {
    this.selected_token_id = selectedId;
    this.selected_token = testData.find((token: any) => token.id == this.selected_token_id);
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
