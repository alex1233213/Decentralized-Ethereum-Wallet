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

  constructor(private accountsService: AccountsService,
              private walletService: WalletService) { }

  ngOnInit(): void {
    this.walletService.getWallet().subscribe( (wallet) => {
      this.wallet = wallet;
    });
  }


  addAccount() {
    this.accountsService.addAccount(this.wallet);
  }


  getAccounts() {
    // localStorage.getItem('accounts')
  }

}
