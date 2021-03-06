/*
* Validator function that will return error if
*   - the amount is not greater than 0
*   - amount is greater than token balance
* */


import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function sendAmountValidator(): ValidatorFn {
  return (send_transaction_form: AbstractControl): ValidationErrors | null => {

    //get the token that was selected from the options provided
    let selected_token_control: AbstractControl | null = send_transaction_form.get('selected_token');
    let selected_token_balance: any;

    if(selected_token_control == null) {
      return null;
    } else {
      //get the token balance
      let selected_token_id = selected_token_control.value.id;
      selected_token_balance = selected_token_control.value.balance;
    }



    //get the amount the user wants to send
    let send_amount_control = send_transaction_form.get('send_amount');

    if(send_amount_control == null) {
      return null;
    } else {
      let send_amount = send_amount_control.value;

      //when user tries to send a higher amount than their balance then return error
      if( (parseFloat(send_amount) >  parseFloat(selected_token_balance)) ) {
        return {sendAmountHigh: {value: send_amount}};
      }

      if( send_amount <= 0) {
        return {invalidSendAmount: {value: send_amount}};
      }
    }


    return null;
  };
}
