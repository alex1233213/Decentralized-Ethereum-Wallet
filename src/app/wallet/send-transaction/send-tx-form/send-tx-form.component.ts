import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { addressValidator } from "../../../shared/validators/addressValidator";
import { sendAmountValidator } from "../../../shared/validators/sendAmountValidator";
import { Token } from "../../../shared/utils/Token";

@Component({
  selector: 'app-send-tx-form',
  templateUrl: './send-tx-form.component.html',
  styleUrls: ['./send-tx-form.component.css']
})
export class SendTxFormComponent implements OnInit {

  send_transaction_form: FormGroup;
  selected_token: Token;
  @Input() tokens_data: Token[];

  constructor() { }

  ngOnInit(): void {
    this.selected_token = this.tokens_data[0];
    this.initialiseForm();
  }

  initialiseForm() {
    this.send_transaction_form = new FormGroup({
      selected_token: new FormControl(this.selected_token),
      send_amount: new FormControl('',
        [Validators.required]),
      receiving_address: new FormControl('', [ Validators.required, addressValidator()] )
    }, { validators: sendAmountValidator() });
  }


  get send_amount_edited() {
    return this.send_transaction_form.get('send_amount')?.touched
      ||
      this.send_transaction_form.get('send_amount')?.dirty;
  }


  get receiving_address() {
    return this.send_transaction_form.get('receiving_address')!;
  }


  next() {
    console.log(this.send_transaction_form.value);
  }



}
