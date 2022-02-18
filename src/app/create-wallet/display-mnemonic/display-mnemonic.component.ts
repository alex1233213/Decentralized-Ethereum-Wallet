import { Component , Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-mnemonic',
  templateUrl: './display-mnemonic.component.html',
  styleUrls: ['./display-mnemonic.component.css']
})
export class DisplayMnemonicComponent implements OnInit {
  @Input() mnemonic: string[];

  user_confirmation: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }


  toggleUserConfirmation(checked: boolean) {
    this.user_confirmation = checked;
  }

}
