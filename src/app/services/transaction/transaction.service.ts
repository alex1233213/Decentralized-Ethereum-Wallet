import { Injectable } from '@angular/core';
import { BigNumber, ethers, utils, Wallet } from "ethers";
import { FormGroup } from "@angular/forms";
import { tokenAddresses } from "../../shared/utils/token_addresses/token-addresses";
import { abi } from "../../shared/utils/abi/erc-20-ABI";
import { NonceManager } from "@ethersproject/experimental";
import { Token } from "../../shared/utils/types/Token";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  gas_limit = 100000;

  constructor() { }

  /*
  * method that sends ether and other ERC-20 tokens.
  * The argument 'contract_address' is required when sending an ERC-20 token.
  * ===============================================================================
  * Part of the following code has been taken from the ethereum documentation website.
  * https://ethereum.org/fr/developers/tutorials/send-token-etherjs/
  * Author: Kim YongJun
  * Date accessed: 14/03/2022
  * ===============================================================================
  */
  send_transaction(
    send_amount: string,
    send_token: Token,
    receiving_address: string,
    wallet: Wallet
  ) {
      const send_token_id = send_token.id;

      if(send_token_id == 'ethereum') {
        this.send_token(send_amount, receiving_address, wallet);
      } else { //ERC-20 token
        let contract_address = tokenAddresses[send_token_id];

        this.send_token(send_amount, receiving_address, wallet, contract_address);
      }
  }


  send_token(
    send_token_amount: string,
    to_address: string, // receiving address
    wallet: Wallet,
    contract_address?: any
  )

  {
    const nonce_manager = new NonceManager(wallet);

    wallet.provider.getGasPrice().then((currentGasPrice: BigNumber) => {
      let gas_price = ethers.utils.hexlify(currentGasPrice);
      console.log(`gas_price: ${utils.formatEther(gas_price)}`);

      //If sending ERC-20 token, contract_address will be supplied
      if (contract_address) {

        let contract = new ethers.Contract(
          contract_address,
          abi,
          wallet
        );

        //convert the sending amount to wei - 1 ether represents (10 ^ 18) wei
        let send_amount = ethers.utils.parseUnits(send_token_amount, 18);
        console.log(`sending amount: ${send_amount}`);

        // Send tokens
        contract['transfer'](to_address, send_amount).then( (transferResult: any) => {
          console.log(transferResult);
        });


      } else { // send ethereum

        let gas_limit = 100000;

        const tx = {
          from: wallet.address,
          to: to_address,
          value: ethers.utils.parseEther(send_token_amount),
          gasLimit: ethers.utils.hexlify(gas_limit), // 100000
          gasPrice: gas_price,
        }


        try {
          nonce_manager.sendTransaction(tx).then((transaction) => {
            alert('transaction has been initiated');
            console.log(transaction);
          });
        } catch (error) {
          alert("failed to send!!")
          console.log('error sending transaction');
        }
      }
    });
  }



  //estimate gas fee for ethereum transaction
  async estimateEthTxFee(wallet: Wallet) {
    // @ts-ignore
    let gasFee = (await wallet.provider.getFeeData()).maxFeePerGas.mul(this.gas_limit);

    return parseFloat(utils.formatEther(gasFee));
  }


  //method estimates the gas fee for a erc20 token transaction
  async estimateErc20GasFee(contract_address: string, wallet: Wallet) {

    let erc20_gas_limit_wei: number = 200000;
    let erc20_gas_limit_bn: BigNumber = BigNumber.from(erc20_gas_limit_wei);


    // @ts-ignore
    let gas_fee: BigNumber = (await wallet.provider.getFeeData()).maxFeePerGas.mul(erc20_gas_limit_bn);

    return parseFloat(utils.formatEther(gas_fee));
  }


  async estimateGasFee(send_token: Token, wallet: Wallet) {
    let gasFee;

    if(send_token.id == 'ethereum') {

      gasFee = await this.estimateEthTxFee(wallet);

    } else { //estimate gas for ERC-20 token contract transaction
      let contract_address = tokenAddresses[send_token.id];

      gasFee = await this.estimateErc20GasFee(contract_address, wallet);
    }

    return gasFee;
  }

}
