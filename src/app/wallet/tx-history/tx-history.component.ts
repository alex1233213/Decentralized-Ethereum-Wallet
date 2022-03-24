import { Component, OnInit } from '@angular/core';
import { TxHistoryService } from "../../services/tx-history/tx-history.service";
import { Wallet } from "ethers";
import { WalletService } from "../../services/wallet/wallet.service";

@Component({
  selector: 'app-tx-history',
  templateUrl: './tx-history.component.html',
  styleUrls: ['./tx-history.component.css']
})
export class TxHistoryComponent implements OnInit {

  tx_history: any;
  wallet: Wallet;
  loading_data: boolean;

  constructor(private txHistoryService: TxHistoryService,
              private walletService: WalletService) { }

  ngOnInit(): void {
    this.walletService.getWallet().subscribe( (wallet: Wallet) =>{
      this.loading_data = true;
      this.wallet = wallet;
      this.txHistoryService.getTxHistory(this.wallet).then( history => {
        this.tx_history = history;
        console.log(this.tx_history);
        this.loading_data = false;
      });
    });
  }

}
