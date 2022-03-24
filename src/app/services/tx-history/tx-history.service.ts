import { Injectable } from '@angular/core';
import {ethers, Wallet} from "ethers";
import Moralis from "moralis";

@Injectable({
  providedIn: 'root'
})
export class TxHistoryService {

  constructor() { }

  async getTxHistory(wallet: Wallet) {

    const network = await wallet.provider.getNetwork();
    console.log(network);

    let options;

    if(network.name == 'homestead') {
      options = {
        // chain: "eth",
        address: wallet.address,
      };
    } else {
      options = {
        chain: network.name,
        address: wallet.address,
      };
    }



    // @ts-ignore
    const eth_transactions = await Moralis.Web3API.account.getTransactions(options);
    // const erc_20_transactions = await Moralis.Web3API.account.getTokenTransfers(options);
    // console.log(erc_20_transactions);

    return this.formatTxHistory(eth_transactions, wallet.address);
  }



  formatTxHistory(transactions: any, wallet_address: string) {
    return transactions.result?.map( (transaction: any) => {

      //when the transaction is sent from the wallet
      if(transaction.from_address.toUpperCase() == wallet_address.toUpperCase()) {
        return {
          time: transaction.block_timestamp,
          asset: 'ETH',
          amount: ethers.utils.formatEther(transaction.value),
          type: 'Send',
          address: transaction.to_address,
          status: transaction.receipt_status == 1 ? 'Completed' : 'Failed'
        }
      } else { // when the transaction is received
        return {
          time: transaction.block_timestamp,
          type: 'Receive',
          asset: 'ETH',
          amount: ethers.utils.formatEther(transaction.value),
          address: transaction.from_address,
          status: transaction.receipt_status == 1 ? 'Completed' : 'Failed'
        }
      }
    });
  }
}
