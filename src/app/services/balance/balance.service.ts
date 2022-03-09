import { Injectable } from '@angular/core';
import { ethers, Wallet } from "ethers";

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor() { }

  /*
    method returns the ether balance of a wallet address - 4 decimal places,
    if the wallet is connected to test network it will return the
    test ether amount.
  */
  async readBalance(wallet: Wallet) {
    const ethBalance = await wallet.provider.getBalance('0x603506f9F3C4C8B78ffA39F04797c9Dc216b37B1');
    const remainder = ethBalance.mod(1e14);
    return ethers.utils.formatEther(ethBalance.sub(remainder));
  }


  // readTokenBalance() {
    // const usdc = new ethers.Contract(
    //   config['address'],
    //   config['abi'],
    //   this.wallet
    // );
    //
    // console.log(this.wallet.address);
    // const usdcBalance = await usdc['balanceOf'](this.wallet.address);
    // console.log(`USDC Balance: ${ethers.utils.formatUnits(usdcBalance, 6)}`);
  // }
}
