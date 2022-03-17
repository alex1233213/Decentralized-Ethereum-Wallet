import { Component, OnInit } from '@angular/core';
import { WalletService } from "../../services/wallet/wallet.service";
import { Wallet } from "ethers";
import {NbDialogService} from "@nebular/theme";
import {NewAccDialogComponent} from "../dialogs/new-acc-dialog/new-acc-dialog.component";


@Component({
  selector: 'app-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.css']
})
export class SelectAccountComponent implements OnInit {

  wallet: Wallet;
  accounts: any;

  constructor(private walletService: WalletService,
              private dialogService: NbDialogService) { }

  ngOnInit(): void {
    // localStorage.getItem('accounts');
    // this.walletService.getWallet().subscribe((wallet: Wallet) => {
    //   this.wallet = wallet;
    // });
    // `m/44'/60'/0'/0/2`
    // this.wallet = Wallet.fromMnemonic(
    //   'tomato snack album rule blush pistol shoulder pole ship design inhale suffer');

    this.addAccount();
  }


  addAccount() {
    //get the accounts and their hd path index
    const accounts: {} = JSON.parse(<string>localStorage.getItem('accounts'));
    const account_indexes: number[] = Object.values(accounts);

    //get the index for the new account to be created
    const max_index = Math.max(...account_indexes);
    const new_account_index = max_index + 1;

    let account_name;
    //prompt the user for the account name
    this.dialogService.open(NewAccDialogComponent).onClose
      .subscribe(acc_name => {
        account_name = acc_name;


        if(account_name != undefined) {
          console.log(account_name);
        }
      });



    // this.walletService.switchWallet
    // console.log(max_index);
    // const max_acc_index = Math
    // console.log(accounts);
    // localStorage.setItem('accounts')
  }


  getAccounts() {
    // localStorage.getItem('accounts')
  }

}
