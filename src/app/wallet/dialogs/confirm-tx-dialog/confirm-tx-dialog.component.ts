import {Component, OnDestroy, OnInit} from '@angular/core';
import { Token } from "../../../shared/utils/Token";
import { TransactionService } from "../../../services/transaction/transaction.service";
import { Wallet } from "ethers";
import { NbDialogRef } from "@nebular/theme";
import Timeout = NodeJS.Timeout;

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
  gasFee: number;
  interval_id: Timeout;

  constructor(private txService: TransactionService,
              protected dialogRef: NbDialogRef<ConfirmTxDialogComponent>) { }

  ngOnInit(): void {
    //update the gas fee every 3 seconds
    this.interval_id = setInterval( async () => {
      await this.estimateTransactionFee();
      console.log('this.gasFee: ' + this.gasFee);
    }, 3000);
  }


  ngOnDestroy() {
    clearInterval(this.interval_id);
  }


  async estimateTransactionFee() {
    this.gasFee = await this.txService.estimateGasFee(this.send_token, this.wallet);
    // console.log('this.gasFee: ' + this.gasFee);
  }


  close() {
    this.dialogRef.close();
  }


}
