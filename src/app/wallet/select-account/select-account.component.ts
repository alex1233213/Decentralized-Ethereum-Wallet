import { Component, OnInit } from '@angular/core';
import { WalletService } from "../../services/wallet/wallet.service";
import { Wallet } from "ethers";
import { AccountsService } from "../../services/accounts/accounts.service";
import { Account } from "../../shared/utils/types/Account";


@Component({
  selector: 'app-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.css']
})
export class SelectAccountComponent implements OnInit {

  wallet: Wallet;
  accounts: any;
  selected_account: string;
  show_accounts_menu: boolean = false;
  loading: boolean;

  constructor(private accountsService: AccountsService,
              private walletService: WalletService) { }

  ngOnInit(): void {
    this.accountsService.getSelectedAccount().subscribe( (account: string) => {
      this.selected_account = account;
    });

    this.walletService.getWallet().subscribe( (wallet) => {
      this.wallet = wallet;
      this.accounts = this.accountsService.getAccountsAndAddresses(this.wallet);
    });
  }




  addAccount() {
    this.accountsService.addAccount(this.wallet);
  }




  async onAccountSelect(account: Account) {
    this.loading = true;

    setTimeout(() => {
      this.selected_account = account.account_name;
      this.accountsService.setSelectedAccount(this.selected_account);
      this.accountsService.deriveAccount(account.index, this.wallet.mnemonic.phrase);
      this.show_accounts_menu = !this.show_accounts_menu;
      this.loading = false;
    }, 10);

  }

}
