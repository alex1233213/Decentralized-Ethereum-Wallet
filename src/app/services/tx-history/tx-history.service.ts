import {Injectable} from '@angular/core';
import {ethers, Wallet} from "ethers";
import Moralis from "moralis";

@Injectable({
  providedIn: 'root'
})
export class TxHistoryService {

  constructor() { }

  async getTxHistory(wallet: Wallet) {
    const network = await wallet.provider.getNetwork();
    let options;

    if(network.name == 'homestead') {
      options = {
        address: wallet.address,
      };
    } else {
      options = {
        chain: network.name,
        address: wallet.address,
      };
    }

    let all_transactions: any = [];

    // @ts-ignore
    //get the ether transactions to and from the wallet
    const eth_transactions = (await Moralis.Web3API.account.getTransactions(options)).result;
    const eth_transactions_formatted = await this.formatTxHistory(eth_transactions, wallet.address);
    all_transactions = all_transactions.concat(eth_transactions_formatted);

    // @ts-ignore
    //get the erc20 token transactions to and from the wallet
    const erc_20_transactions = (await Moralis.Web3API.account.getTokenTransfers(options)).result;
    const erc_20_txs_formatted = await this.formatTxHistory(erc_20_transactions, wallet.address);
    all_transactions = all_transactions.concat(erc_20_txs_formatted);

    return all_transactions;
  }



  async formatTxHistory(transactions: any, wallet_address: string) {
    for(const tx of transactions) {
      //an erc 20 transaction will have an address in its object
      if(tx.address != undefined) {
        const token_metadata: any = (await this.getTokenByAddress(tx.address))[0];
        console.log(token_metadata);
        tx.asset = token_metadata.symbol;
        tx.decimals = token_metadata.decimals;
        tx.amount_formatted = ethers.utils.formatUnits(tx.value, tx.decimals);
      }
    }


    return transactions.map( (transaction: any) => {

      //when the transaction is sent from the wallet
      if(transaction.from_address.toUpperCase() == wallet_address.toUpperCase()) {
        return {
          time: transaction.block_timestamp,
          asset: transaction.asset ? transaction.asset : 'ETH',
          amount: transaction.amount_formatted ? transaction.amount_formatted : ethers.utils.formatEther(transaction.value),
          type: 'Send',
          address: transaction.to_address,
          status: transaction.receipt_status == 1 ? 'Completed' : 'Failed'
        }
      } else { // when the transaction is received by the wallet
        return {
          time: transaction.block_timestamp,
          type: 'Receive',
          asset: transaction.asset ? transaction.asset : 'ETH',
          amount: transaction.amount_formatted ? transaction.amount_formatted : ethers.utils.formatEther(transaction.value),
          address: transaction.from_address,
          status: transaction.receipt_status == 1 ? 'Completed' : 'Failed'
        }
      }
    });
  }



  async getTokenByAddress(address: string) {
    const options = {
      addresses: address,
    };
    // @ts-ignore
    return await Moralis.Web3API.token.getTokenMetadata(options);
  }
}
