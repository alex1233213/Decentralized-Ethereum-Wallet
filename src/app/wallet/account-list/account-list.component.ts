import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Account } from "../../shared/utils/types/Account";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  @Input() accounts: Account[];
  @Input() selected_account: string;
  @Input() truncate: boolean;
  @Output() account_select = new EventEmitter<Account>();

  constructor() {
  }

  ngOnInit(): void {
  }


  onAccountSelect(account: Account) {
    this.account_select.emit(account);
  }

}
