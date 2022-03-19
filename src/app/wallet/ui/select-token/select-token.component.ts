import { Component, Input, OnInit } from '@angular/core';
import { Token } from "../../../shared/utils/types/Token";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-select-token',
  templateUrl: './select-token.component.html',
  styleUrls: ['./select-token.component.css']
})
export class SelectTokenComponent implements OnInit {

  selected_token: Token;
  @Input() tokens_data: Token[];
  @Input() form_control: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.selected_token = this.tokens_data[0];
    this.form_control.setValue(this.selected_token);
  }

}
