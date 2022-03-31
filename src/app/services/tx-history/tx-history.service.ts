import { Injectable } from '@angular/core';
import { ethers, Wallet } from "ethers";
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
    const eth_transactions_formatted = await this.formatTxHistory(eth_transactions, wallet.address, wallet);
    all_transactions = all_transactions.concat(eth_transactions_formatted);

    // @ts-ignore
    //get the erc20 token transactions to and from the wallet
    const erc_20_transactions = (await Moralis.Web3API.account.getTokenTransfers(options)).result;
    const erc_20_txs_formatted = await this.formatTxHistory(erc_20_transactions, wallet.address, wallet);
    all_transactions = all_transactions.concat(erc_20_txs_formatted);

    return all_transactions;
  }



  async formatTxHistory(transactions: any, wallet_address: string, wallet: Wallet) {
    for(const tx of transactions) {
      //an erc 20 transaction will have an address in its object
      if(tx.address != undefined) {
        const token_metadata: any = (await this.getTokenByAddress(tx.address))[0];
        console.log(token_metadata);
        tx.asset = token_metadata.symbol;
        tx.decimals = token_metadata.decimals;
        tx.amount_formatted = this.roundTo4Decimals(ethers.utils.formatUnits(tx.value, tx.decimals));

        const tx_hash = tx.transaction_hash;
        tx.tx_receipt = await this.checkTxStatus(tx_hash, wallet);
      }
    }



    return transactions.map( (tx: any) => {
      const transaction_sent: boolean = (tx.from_address.toUpperCase() == wallet_address.toUpperCase());

      console.log(tx);

      return {
        time: tx.block_timestamp.split('T')[0], //get only the date from the timestamp
        asset: tx.asset ? tx.asset : 'ETH',
        amount: tx.amount_formatted ? tx.amount_formatted : this.roundTo4Decimals(ethers.utils.formatEther(tx.value)),
        type: transaction_sent ?  'Send' : 'Receive',
        address: transaction_sent ? tx.to_address : tx.from_address,
        status: tx.receipt_status == 1 || tx.tx_receipt ? 'Completed' : 'Failed'
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




  // @ts-ignore
  async checkTxStatus(transaction_hash: string, wallet: Wallet) {
    const tx_receipt = await wallet.provider.getTransactionReceipt(transaction_hash);

    if (tx_receipt && tx_receipt.blockNumber) {
      return tx_receipt;
    }
  }


  roundTo4Decimals(float_value: string) {
    return parseFloat(float_value).toFixed(4);
  }
}
