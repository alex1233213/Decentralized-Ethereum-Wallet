import { Component, OnInit } from '@angular/core';
import Moralis from "moralis";
import {WalletService} from "../../services/wallet/wallet.service";
import {Wallet} from "ethers";
import {NbDialogService} from "@nebular/theme";
import {BuyEthConfirmComponent} from "../../wallet/dialogs/buy-eth-confirm/buy-eth-confirm.component";

@Component({
  selector: 'app-wallet-layout',
  templateUrl: './wallet-layout.component.html',
  styleUrls: ['./wallet-layout.component.css']
})
export class WalletLayoutComponent implements OnInit {

  wallet_address: string;

  constructor(private walletService: WalletService,
              private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.walletService.getWallet().subscribe( (wallet: Wallet) => {
      wallet.getAddress().then( (address: string) => this.wallet_address = address);
    });
  }


  async buyEther() {
    if(this.wallet_address) {
      await navigator.clipboard.writeText(this.wallet_address);

      this.dialogService.open(BuyEthConfirmComponent)
        .onClose.subscribe(async (confirmed) => {
          if(confirmed == true) {
            await Moralis.initPlugins();

            await this.openInNewTab();
          }
      });
    }
  }



  async openInNewTab() {
    const result = await Moralis.Plugins['fiat'].buy({}, {disableTriggers: true});
    const url = result.data;

    console.log(url);

    // @ts-ignore
    window.open(url, '_blank').focus();
  }


}
