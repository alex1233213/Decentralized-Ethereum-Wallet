import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { addressValidator } from "../../../shared/validators/addressValidator";
import { sendAmountValidator } from "../../../shared/validators/sendAmountValidator";
import { Token } from "../../../shared/utils/types/Token";
import { TransactionService } from "../../../services/transaction/transaction.service";
import { Wallet } from "ethers";
import { NbDialogService } from "@nebular/theme";
import { ConfirmTxDialogComponent } from "../../dialogs/confirm-tx-dialog/confirm-tx-dialog.component";
import { Account } from "../../../shared/utils/types/Account";


@Component({
  selector: 'app-send-tx-form',
  templateUrl: './send-tx-form.component.html',
  styleUrls: ['./send-tx-form.component.css']
})
export class SendTxFormComponent implements OnInit {

  send_transaction_form: FormGroup;
  selected_token: Token;
  gasFee: number;
  show_accounts: boolean = false;
  insufficient_funds_gas: boolean;
  @Input() tokens_data: Token[];
  @Input() wallet: Wallet;
  @Input() accounts: Account[];


  constructor(private transaction_service: TransactionService,
              private dialogService: NbDialogService ) { }

  ngOnInit(): void {
    this.selected_token = this.tokens_data[0];
    this.transaction_service.estimateGasFee(this.selected_token, this.wallet).then( fee => this.gasFee = fee);
    this.initialiseForm();
  }

  initialiseForm() {
    this.send_transaction_form = new FormGroup({
      selected_token: new FormControl(this.selected_token),
      send_amount: new FormControl('',
        [Validators.required]),
      receiving_address: new FormControl('',
        [ Validators.required, addressValidator()] )
    }, { validators: sendAmountValidator() });
  }


  get send_amount() {
    const send_amount = this.send_transaction_form.get('send_amount')!.value;

    if( send_amount == '' || send_amount == null) {
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
    console.log(this.tokens_data);
    const ether: any = this.tokens_data.find( token => token.id == 'ethereum');
    const balance = ether.balance;

    if( balance < this.gasFee) {
      this.insufficient_funds_gas = true;
    } else {
      this.open_confirm_dialogue();
    }
  }


  open_confirm_dialogue() {
    this.dialogService.open(ConfirmTxDialogComponent, {
      context: {
        send_token: this.selected_token,
        send_amount: this.send_amount,
        recipient_address: this.receiving_address.value,
        wallet: this.wallet
      }
    });
  }


  getGasFee() {
    this.transaction_service.estimateGasFee(this.selected_token, this.wallet).then( fee => this.gasFee = fee);
  }



  copyAddress(account: Account) {
    this.send_transaction_form.get('receiving_address')!.setValue(account.account_address);
    this.show_accounts = false;
  }

}
