import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {  FormControl, FormGroup, Validators } from "@angular/forms";
import { passwordMatchValidator} from "../../shared/validators/passwordMatch";

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {
  @Output() passwordSubmitEvent = new EventEmitter<string>();
  @Input() loading: boolean = false;

  formSubmitted: boolean = false;

  passwordForm = new FormGroup({
    password: new FormControl('', [
        Validators.required,
        //regex pattern for password: min 7 characters with at least one number and one special character
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{7,}$/)
      ]
    ),
    confirm_password: new FormControl('')
  }, {validators: passwordMatchValidator});


  constructor() { }

  ngOnInit(): void {

  }

  onContinue() {
    if(this.passwordForm.valid) {
      this.passwordSubmitEvent.emit(this.passwordForm.get('password')?.value);
    }
  }




}
