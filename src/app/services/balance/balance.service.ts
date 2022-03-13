import { Injectable } from '@angular/core';
import { ethers, Wallet } from "ethers";
import { abi } from "../../shared/utils/erc-20-ABI";
import { tokenAddresses } from '../../shared/utils/token-addresses';

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
  async readEtherBalance(wallet: Wallet) {
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

    for (const token of Object.keys(tokenAddresses)) {
      const contract = new ethers.Contract(tokenAddresses[token], abi, wallet);
      const balance = await contract['balanceOf'](wallet.address);
      tokenBalances[token] = ethers.utils.formatUnits(balance, 6);
    }


    return tokenBalances;

    //****//****//****//****//****//****//****//****//****//****//****
    // const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    //
    // const usdcContract = new ethers.Contract(
    //   usdcAddress,
    //   abi,
    //   wallet
    // );

    //***** usdc balance
    // const usdcBalance = await usdcContract['balanceOf'](wallet.address);
    // console.log(`USDC Balance: ${ethers.utils.formatUnits(usdcBalance, 6)}`);

    // return ethers.utils.formatUnits(usdcBalance, 6);
    //****//****//****//****//****//****//****//****//****//****//****
  }
}
