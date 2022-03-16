import { Component, OnInit } from '@angular/core';
import { Token } from "../../../shared/utils/Token";
import { TransactionService } from "../../../services/transaction/transaction.service";
import { Wallet } from "ethers";
import {tokenAddresses} from "../../../shared/utils/token-addresses";

@Component({
  selector: 'app-confirm-tx-dialog',
  templateUrl: './confirm-tx-dialog.component.html',
  styleUrls: ['./confirm-tx-dialog.component.css']
})
export class ConfirmTxDialogComponent implements OnInit {

  send_token: Token;
  send_amount: number;
  recipient_address: string;
  wallet: Wallet;
  gasFee: number;

  constructor(private txService: TransactionService) { }

  ngOnInit(): void {
    // setInterval( async () => {
    //   this.gasFee = await this.txService.estimateGasFee(this.wallet);
    //   console.log('this.gasFee: ' + this.gasFee);
    // }, 3000);


    this.estimateTransactionFee();
  }


  async estimateTransactionFee() {
    if(this.send_token.id == 'ethereum') {

      this.gasFee = await this.txService.estimateGasFee(this.wallet);

    } else { //estimate gas for ERC-20 token contract transaction
      let contract_address = tokenAddresses[this.send_token.id];

      this.gasFee = await this.txService.estimateErc20GasFee(contract_address, this.wallet);
    }
  }


}
