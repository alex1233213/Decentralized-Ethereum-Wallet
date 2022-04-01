import { Injectable } from '@angular/core';
import { ethers, Wallet } from "ethers";
import { abi } from "../../shared/utils/abi/erc-20-ABI";
import { tokens } from '../../shared/utils/token_addresses/tokens';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  ethBalance: string;
  wallet: Wallet;

  constructor() {}


  //method gets the balance of ether and other erc-20 tokens
  async getWalletFunds(wallet: Wallet)  {
    let walletFunds: any = {};

    walletFunds = await this.readErc20TokensBalance(wallet);
    walletFunds.ethereum = await this.readEtherBalance(wallet);

    return walletFunds;
  }

  /*
    method returns the ether balance of a wallet address - 4 decimal places,
    if the wallet is connected to test network it will return the
    test ether amount.
  */
  async readEtherBalance(wallet: Wallet): Promise <string> {
    const ethBalance = await wallet.provider.getBalance(wallet.address);
    const remainder = ethBalance.mod(1e14);
    return ethers.utils.formatEther(ethBalance.sub(remainder));
  }


  async readErc20TokensBalance(wallet: Wallet) {

    const network = await wallet.provider.getNetwork();

    //erc-20 tokens are only displayed on the main net
    if(network == undefined || network.name != "homestead") {
      return {};
    }

    let tokenBalances: any = {};

    for (const token of tokens) {
      const contract = new ethers.Contract(token.contract_address, abi, wallet);
      const balance = await contract['balanceOf'](wallet.address);
      tokenBalances[token.name] = ethers.utils.formatUnits(balance, token.decimals);
    }


    return tokenBalances;
  }
}
