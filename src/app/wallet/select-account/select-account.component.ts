import { Component, OnInit } from '@angular/core';
import { WalletService } from "../../services/wallet/wallet.service";
import { Wallet } from "ethers";
import { AccountsService } from "../../services/accounts/accounts.service";
import { Account } from "../../shared/utils/types/Account";
import { NbToastrService } from "@nebular/theme";
import {BalanceService} from "../../services/balance/balance.service";
import {Observable} from "rxjs";


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
  overall_balance: string;

  constructor(private accountsService: AccountsService,
              private walletService: WalletService,
              private toastrService: NbToastrService,
              private balanceService: BalanceService) { }

  async ngOnInit() {
    this.accountsService.getSelectedAccount().subscribe( (account: string) => {
      this.selected_account = account;
    });

    this.walletService.getWallet().subscribe( async (wallet) => {
      this.wallet = wallet;
      this.accounts = this.accountsService.getAccountsAndAddresses(this.wallet);

      // @ts-ignore
      this.balanceService.getOverAllBalance(this.wallet).then( value => {
        this.overall_balance = value;
        console.log(this.overall_balance);
      });

    });


  }




  addAccount() {
    this.accountsService.addAccount(this.wallet);
    this.show_accounts_menu = !this.show_accounts_menu;
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


  async copyAddress() {
    await navigator.clipboard.writeText(this.wallet.address);

    this.notifyCopy();
  }


  notifyCopy() {
    this.toastrService.show(
      this.wallet.address,
      `Address copied to the clipboard`,
      { duration: 3000, icon: '' });
  }

}
