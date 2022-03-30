import { Injectable } from '@angular/core';
import { NewAccDialogComponent } from "../../wallet/dialogs/new-acc-dialog/new-acc-dialog.component";
import { NbDialogService } from "@nebular/theme";
import { WalletService } from "../wallet/wallet.service";
import { ethers, Wallet } from "ethers";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private accounts$: BehaviorSubject<any> = new BehaviorSubject<any>(this.getAccountsLocalStorage());
  private selected_account$: BehaviorSubject<any>;

  constructor(private dialogService: NbDialogService,
              private walletService: WalletService) {
    if( localStorage.getItem('accounts') == null ) {
      this.selected_account$ = new BehaviorSubject<any>(null);
    } else {
      this.selected_account$ = new BehaviorSubject<any>(Object.keys(this.getAccountsLocalStorage())[0]);
    }
  }



  getAccounts() {
    return this.accounts$.asObservable();
  }


  setAccounts(accounts: {}) {
    this.accounts$.next(accounts);
  }

  generateFirstAccount(wallet: Wallet) {
    const accounts = {'Account 1': 0};

    localStorage.setItem('accounts', JSON.stringify(accounts));
    this.setAccounts(accounts);
    this.setSelectedAccount('Account 1');

    //derive new account
    this.deriveAccount("0", wallet.mnemonic.phrase);
  }

  getSelectedAccount() {
    return this.selected_account$.asObservable();
  }

  setSelectedAccount(account: string)  {
    this.selected_account$.next(account);
  }



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
          this.setAccounts(accounts);
          this.setSelectedAccount(account_name);

          //derive new account
          this.deriveAccount(new_account_index.toString(), wallet.mnemonic.phrase);
        }
      });
  }


  deriveAccount(account_index: string, mnemonic: string): Promise<null> {
    return new Promise( () => {
      const path =  `m/44'/60'/0'/0/${ account_index }`;

      const new_wallet: Wallet = Wallet.fromMnemonic(mnemonic, path);
      this.walletService.reloadWallet(new_wallet);
    });
  }


  getAccountsLocalStorage(){
    if( localStorage.getItem('accounts') ) {
      return JSON.parse(<string>localStorage.getItem('accounts'));
    } else {
      return null;
    }
  }


  getAccountsAndAddresses(wallet: Wallet) {
    // console.log(this.accounts$.value);
    const accounts = this.accounts$.value;

    return Object.keys(accounts).map( (account_name) => {
        const index = accounts[account_name];
        const account_address = this.getAccountAddress(wallet, index.toString());
        return {
          account_name,
          account_address,
          index: index.toString()
        };
    });
  }


  getAccountAddress(wallet: Wallet, account_index: string) {
    const path =  `m/44'/60'/0'/0/${ account_index }`;

    return ethers.Wallet.fromMnemonic(wallet.mnemonic.phrase, path).address;
  }
}
