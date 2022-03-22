
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function swapTokensValidator(): ValidatorFn {
  return (swap_form: AbstractControl): ValidationErrors | null => {

    //get the token that was selected from the options provided
    const from_token_id = swap_form.get('from_token')?.value.id;

    const to_token_id = swap_form.get('to_token')?.value.id;

    if(to_token_id == undefined || to_token_id == from_token_id) {
      return {invalidSelection: {value: to_token_id}};
    }

    return null;
  };
}
