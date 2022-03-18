import { Component, OnInit } from '@angular/core';
import { WalletService } from "../../services/wallet/wallet.service";
import { Wallet } from "ethers";
import { AccountsService } from "../../services/accounts/accounts.service";


@Component({
  selector: 'app-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.css']
})
export class SelectAccountComponent implements OnInit {

  wallet: Wallet;
  accounts: any;
  selected_account: string;

  constructor(private accountsService: AccountsService,
              private walletService: WalletService) { }

  ngOnInit(): void {
    this.accounts = this.getAccounts();

    //selected account will be the first account
    this.selected_account = Object.keys(this.accounts)[0];

    this.walletService.getWallet().subscribe( (wallet) => {
      this.wallet = wallet;
    });
  }


  addAccount() {
    this.accountsService.addAccount(this.wallet);
  }


  getAccounts() {
    return this.accountsService.getAccounts();
  }


  onAccountSelect() {
    const selected_index = this.accounts[this.selected_account];
    // console.log(selected_index);
    const mnemonic = this.wallet.mnemonic.phrase;
    this.accountsService.deriveAccount(selected_index.toString(), mnemonic);
  }

}
