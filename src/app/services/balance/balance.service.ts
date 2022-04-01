import { Injectable } from '@angular/core';
import { ethers, Wallet } from "ethers";
import { abi } from "../../shared/utils/abi/erc-20-ABI";
import { tokens } from '../../shared/utils/token_addresses/tokens';
import { CoinGeckoService } from "../coinGecko/coin-gecko.service";

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  ethBalance: string;
  wallet: Wallet;

  constructor(private coinGeckoService: CoinGeckoService) {}


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



  async getOverAllBalance(wallet: Wallet): Promise<any> {
    let overallBalance: string;

    return new Promise(resolve => {
      wallet.provider.getNetwork().then(  async (network) => {
        //if the network is mainnet then return the values of the different tokens owned by the user
        if(network.name == 'homestead') {
          //get the eth value
          const eth_balance = await this.readEtherBalance(wallet);
          const eth_price = await this.coinGeckoService.getEthPrice().then( (price: any) => price.ethereum.usd);
          const eth_value = parseFloat((parseFloat(eth_balance) * eth_price).toFixed(2));

          //get the tokens values
          const token_balances = await this.readErc20TokensBalance(wallet);
          let tokens_values_sum: number = 0;

          for (const token of Object.keys(token_balances)) {
            //if the token balance is not 0 then get the token price from CoinGecko API
            if(parseFloat(token_balances[token]) != 0) {
              const token_price = await this.coinGeckoService.getErc20TokenPrice(token)
                .then( (price: any) => price[token].usd);

              const token_value = (parseFloat(token_balances[token]) * token_price).toFixed(2);
              tokens_values_sum += parseFloat(token_value);
            }
          }

          const total_assets_value = tokens_values_sum + eth_value;

          overallBalance = total_assets_value + ' $'
          resolve(overallBalance);
        } else { //the value of the tokens is the test net ether
          overallBalance = await this.readEtherBalance(wallet) + ' ETH';
          resolve(overallBalance);
        }
      });
    });
  }
}
