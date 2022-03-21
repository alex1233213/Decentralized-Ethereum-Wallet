import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Token } from "../../../shared/utils/types/Token";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-select-token',
  templateUrl: './select-token.component.html',
  styleUrls: ['./select-token.component.css']
})
export class SelectTokenComponent implements OnInit {

  @Input() tokens_data: Token[];
  @Input() form_control: FormControl;
  @Output() selected_token_event = new EventEmitter<Token>();

  constructor() { }

  ngOnInit(): void { }


  get selected_token() {
    return this.form_control.value;
  }


  emitSelectChange(token: Token) {
    this.selected_token_event.emit(token);
  }
}
