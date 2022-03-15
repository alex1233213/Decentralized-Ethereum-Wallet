import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { addressValidator } from "../../../shared/validators/addressValidator";
import { sendAmountValidator } from "../../../shared/validators/sendAmountValidator";
import { Token } from "../../../shared/utils/Token";
import { TransactionService } from "../../../services/transaction/transaction.service";
import { Wallet } from "ethers";


@Component({
  selector: 'app-send-tx-form',
  templateUrl: './send-tx-form.component.html',
  styleUrls: ['./send-tx-form.component.css']
})
export class SendTxFormComponent implements OnInit {

  send_transaction_form: FormGroup;
  selected_token: Token;
  gasFee: number;
  @Input() tokens_data: Token[];
  @Input() wallet: Wallet;


  constructor(private transaction_service: TransactionService) { }

  ngOnInit(): void {
    this.transaction_service.estimateGasFee(this.wallet).then( fee => this.gasFee = fee);
    this.selected_token = this.tokens_data[0];
    this.initialiseForm();
  }

  initialiseForm() {
    this.send_transaction_form = new FormGroup({
      selected_token: new FormControl(this.selected_token),
      send_amount: new FormControl('',
        [Validators.required]),
      receiving_address: new FormControl('0xFdd33f5C895299867961CDb8a98f6B78Fe77Fcc7', [ Validators.required, addressValidator()] )
    }, { validators: sendAmountValidator() });
  }


  get send_amount() {
    const send_amount = this.send_transaction_form.get('send_amount')!.value;

    if(send_amount == null) {
      return 0;
    } else {
      return parseFloat(send_amount);
    }
  }

  get totalFee() {
    const total_fee = this.send_amount + this.gasFee;

    if(isNaN(total_fee)) {
      return this.gasFee;
    } else {
      return total_fee;
    }
  }


  get send_amount_edited() {
    return this.send_transaction_form.get('send_amount')?.touched
      ||
      this.send_transaction_form.get('send_amount')?.dirty;
  }


  get receiving_address() {
    return this.send_transaction_form.get('receiving_address')!;
  }


  //when user clicks next, the dialog for transaction confirm is displayed
  next() {
    this.transaction_service.send_transaction(this.send_transaction_form, this.wallet);
  }



}