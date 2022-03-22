
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function tradeAmountValidator(): ValidatorFn {
  return (swap_form: AbstractControl): ValidationErrors | null => {

    //get the token that was selected from the options provided
    let selected_token_control: AbstractControl | null = swap_form.get('from_token');
    let selected_token_balance: any;

    if(selected_token_control == null) {
      return null;
    } else {
      //get the token balance
      selected_token_balance = selected_token_control.value.balance;
    }



    //get the amount the user wants to send
    let send_amount_control = swap_form.get('amount');

    if(send_amount_control == null) {
      return null;
    } else {
      let send_amount = send_amount_control.value;

      //when user tries to send a higher amount than their balance then return error
      if( (parseFloat(send_amount) >  parseFloat(selected_token_balance)) ) {
        return {notEnoughBalance: {value: send_amount}};
      }

      if( send_amount <= 0) {
        return {invalidSendAmount: {value: send_amount}};
      }
    }


    return null;
  };
}
