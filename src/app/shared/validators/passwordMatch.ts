import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



//validator that ensures that the password and confirm passwords match
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirm_password')?.value;

  return password !== confirmPassword ? { passwordsMatch: false } : null;
};
