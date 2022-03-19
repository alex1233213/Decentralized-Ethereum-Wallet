import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Token } from "../../../shared/utils/types/Token";
import { Wallet } from "ethers";

@Component({
  selector: 'app-swap-form',
  templateUrl: './swap-form.component.html',
  styleUrls: ['./swap-form.component.css']
})
export class SwapFormComponent implements OnInit {

  swap_form: FormGroup;
  selected_token: Token;
  @Input() wallet: Wallet;
  @Input() tokens_data: Token[];

  constructor() { }

  ngOnInit(): void {
    this.selected_token = this.tokens_data[0];
    this.initializeForm();
    console.log(this.tokens_data);
  }


  initializeForm() {
    this.swap_form = new FormGroup({
      from_token: new FormControl(''),
      to_token: new FormControl(''),
      amount: new FormControl('')
    });
  }
}
