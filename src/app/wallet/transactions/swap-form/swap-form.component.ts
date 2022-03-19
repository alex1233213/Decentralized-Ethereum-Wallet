import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Token } from "../../../shared/utils/types/Token";
import { Wallet } from "ethers";

@Component({
  selector: 'app-swap-form',
  templateUrl: './swap-form.component.html',
  styleUrls: ['./swap-form.component.css']
})
export class SwapFormComponent implements OnInit {

  swap_form: FormGroup;
  default_selected_token: Token;
  @Input() wallet: Wallet;
  @Input() tokens_data: Token[];

  constructor() { }

  ngOnInit(): void {
    this.default_selected_token = this.tokens_data[0];
    this.initializeForm();
    console.log(this.tokens_data);
  }

  //TODO ADD VALIDATION
  initializeForm() {
    this.swap_form = new FormGroup({
      from_token: new FormControl(this.default_selected_token),
      to_token: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    });
  }


  get from_token() {
    return this.swap_form.get('from_token') as FormControl;
  }

  get to_token() {
    return this.swap_form.get('to_token') as FormControl;
  }
}
