// import { Component, OnInit } from '@angular/core';
// import { WalletService } from "../../services/wallet/wallet.service";
// import { Network } from "@ethersproject/networks";
// import { Wallet } from "ethers";
// import { Token } from "../../shared/utils/types/Token";
// import { CoinGeckoService } from "../../services/coinGecko/coin-gecko.service";
// import {testData} from "../../shared/utils/test_data/cgTestData";
// import {BalanceService} from "../../services/balance/balance.service";
//
// @Component({
//   selector: 'app-swap',
//   templateUrl: './swap.component.html',
//   styleUrls: ['./swap.component.css']
// })
// export class SwapComponent implements OnInit {
//
//   network: Network;
//   loading_data: boolean = true;
//   wallet: Wallet;
//   // tokens_data: Token[]; TODO RELEASE
//   tokens_data: Token[] = testData;
//   coin_balances: any = {};
//
//
//   constructor(private walletService: WalletService,
//               private coinGeckoService: CoinGeckoService,
//               private balanceService: BalanceService) { }
//
//   ngOnInit(): void {
//
//     // **** TODO - RELEASE
//     // this.coinGeckoService.getTokensData().subscribe( data => {
//     //   this.loading_data = true;
//     //   this.tokens_data = data;
//     //   console.log(this.tokens_data);
//     //   this.loading_data = false;
//     // });
//
//     this.walletService.getWallet().subscribe( async (wallet) => {
//       this.loading_data = true;
//       this.wallet = wallet;
//       this.network = await this.wallet.provider.getNetwork();
//
//       this.wallet.provider.getNetwork().then( (network: Network) => {
//
//         //get the funds for the wallet on the network
//         this.balanceService.getWalletFunds(this.wallet).then( (funds: any) => {
//           this.coin_balances = funds;
//           this.formatData(network);
//           this.loadingData = false;
//         });
//       });
//
//       this.loading_data = false;
//     });
//
//   }
//
//
//
//
//
//
//
//
// }
