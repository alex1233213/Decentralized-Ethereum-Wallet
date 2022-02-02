import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { passwordMatchValidator } from "../../../shared/passwordMatch";

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {
  @Output() passwordSubmitEvent = new EventEmitter<string>();

  passwordForm = new FormGroup({
    password: new FormControl('', [
        Validators.required,
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
