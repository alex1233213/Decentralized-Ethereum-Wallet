import {Component, OnDestroy, OnInit} from '@angular/core';
import { Token } from "../../../shared/utils/types/Token";
import { TransactionService } from "../../../services/transaction/transaction.service";
import { Wallet } from "ethers";
import { NbDialogRef } from "@nebular/theme";
import Timeout = NodeJS.Timeout;
import {BalanceService} from "../../../services/balance/balance.service";

@Component({
  selector: 'app-confirm-tx-dialog',
  templateUrl: './confirm-tx-dialog.component.html',
  styleUrls: ['./confirm-tx-dialog.component.css']
})
export class ConfirmTxDialogComponent implements OnInit, OnDestroy {

  send_token: Token;
  send_amount: number;
  recipient_address: string;
  wallet: Wallet;
  gas_fee: number;
  eth_balance: string;
  // total_fee: number;
  interval_id: Timeout;

  constructor(private txService: TransactionService,
              protected dialogRef: NbDialogRef<ConfirmTxDialogComponent>,
              private balanceService: BalanceService) { }

  async ngOnInit() {
    this.eth_balance = await this.balanceService.readEtherBalance(this.wallet);
    await this.estimateTransactionFee();
    console.log('ether balance: ' + this.eth_balance);

    //update the gas fee every 3 seconds
    this.interval_id = setInterval( async () => {
      await this.estimateTransactionFee();
    }, 3000);
  }


  ngOnDestroy() {
    clearInterval(this.interval_id);
  }


  async estimateTransactionFee() {
    this.gas_fee = await this.txService.estimateGasFee(this.send_token, this.wallet);
    // console.log('this.gasFee: ' + this.gasFee);
  }


  close() {
    this.dialogRef.close();
  }


  confirmSendTx() {
    this.txService.send_transaction(
      this.send_amount.toString(),
      this.send_token,
      this.recipient_address,
      this.wallet
    );

    this.close();
  }


  // @ts-ignore
  checkEnoughFunds(): boolean {
    if(this.send_token.id == 'ethereum') {
      const transaction_fee = this.send_amount + this.gas_fee;
      console.log(parseFloat(this.eth_balance) < transaction_fee);
      return parseFloat(this.eth_balance) > transaction_fee;
    }

    //erc20 token
    return true;
  }


}
