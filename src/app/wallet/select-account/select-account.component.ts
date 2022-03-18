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

    this.accountsService.getAccounts().subscribe( (accounts: {}) => {
      this.accounts = accounts;
    });


    this.accountsService.getSelectedAccount().subscribe( (account: string) => {
      this.selected_account = account;
    });



    this.walletService.getWallet().subscribe( (wallet) => {
      this.wallet = wallet;
    });
  }




  addAccount() {
    this.accountsService.addAccount(this.wallet);
  }



  onAccountSelect() {
    setTimeout( () => {
      const selected_index = this.accounts[this.selected_account];
      const mnemonic = this.wallet.mnemonic.phrase;
      this.accountsService.deriveAccount(selected_index.toString(), mnemonic);
    }, 100);
  }

}
