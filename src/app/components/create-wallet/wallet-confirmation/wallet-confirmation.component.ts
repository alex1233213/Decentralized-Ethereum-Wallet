import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-wallet-confirmation',
  templateUrl: './wallet-confirmation.component.html',
  styleUrls: ['./wallet-confirmation.component.css']
})
export class WalletConfirmationComponent implements OnInit {
  @Output() confirmEvent = new EventEmitter<null>();

  user_confirmation: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleUserConfirmation(checked: boolean) {
    this.user_confirmation = checked;
  }

  emitConfirmEvent() {
    this.confirmEvent.emit(null);
  }
}
