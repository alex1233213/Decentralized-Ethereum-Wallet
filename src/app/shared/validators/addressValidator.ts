/*
* Validator that checks if the address supplied is a valid address
* */


import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { getAddress } from "ethers/lib/utils";

export function addressValidator(): ValidatorFn {
  return (destinationControl: AbstractControl): ValidationErrors | null => {
    let destination_address = destinationControl.value;

    try {
      getAddress(destination_address);
    } catch (e: any) {
      return {invalidAddress: {value: destination_address}};
    }

    return null;
  }
}
