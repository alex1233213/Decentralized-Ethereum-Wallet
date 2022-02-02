import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-display-mnemonic',
  templateUrl: './display-mnemonic.component.html',
  styleUrls: ['./display-mnemonic.component.css']
})
export class DisplayMnemonicComponent implements OnInit {
  @Input() mnemonic: string[];
  @Output() backupConfirmEvent = new EventEmitter<null>();

  user_confirmation: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }


  toggleUserConfirmation(checked: boolean) {
    this.user_confirmation = checked;
  }


  emitBackupConfirm() {
    this.backupConfirmEvent.emit(null);
  }

}
