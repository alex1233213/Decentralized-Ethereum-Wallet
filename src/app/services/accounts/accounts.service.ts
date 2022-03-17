import { Injectable } from '@angular/core';
import { NewAccDialogComponent } from "../../wallet/dialogs/new-acc-dialog/new-acc-dialog.component";
import { NbDialogService } from "@nebular/theme";
import { WalletService } from "../wallet/wallet.service";
import { Wallet } from "ethers";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {


  constructor(private dialogService: NbDialogService,
              private walletService: WalletService) { }

  addAccount(wallet: Wallet) {
    //get the accounts and their hd path index
    const accounts: any = JSON.parse(<string>localStorage.getItem('accounts'));
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
          //save the new account name and index to the localstorage
          accounts[account_name] = new_account_index;
          localStorage.setItem('accounts', JSON.stringify(accounts));

          //derive new account
          this.deriveAccount(new_account_index.toString(), wallet);
        }
      });
  }


  deriveAccount(account_index: string, wallet: Wallet) {
    const path =  `m/44'/60'/0'/0/${ account_index }`;

    const new_wallet: Wallet = Wallet.fromMnemonic(wallet.mnemonic.phrase, path);
    this.walletService.connectToProvider(new_wallet);
  }
}