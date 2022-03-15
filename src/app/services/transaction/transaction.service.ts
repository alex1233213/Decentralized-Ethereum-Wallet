import { Injectable } from '@angular/core';
import { BigNumber, ethers, utils, Wallet } from "ethers";
import {FormGroup} from "@angular/forms";
import { tokenAddresses } from "../../shared/utils/token-addresses";
import { abi } from "../../shared/utils/erc-20-ABI";

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

  //send transaction using data from the form
  send_transaction(transaction_form: FormGroup, wallet: Wallet) {
    const send_amount = transaction_form.get('send_amount')!.value.toString();
    const send_token = transaction_form.get('selected_token')!.value.id;
    const receiving_address = transaction_form.get('receiving_address')!.value;


    if(send_token == 'ethereum') {
      this.send_token(send_amount, receiving_address, wallet);
    } else { //ERC-20 token
      let contract_address = tokenAddresses[send_token];

      this.send_token(send_amount, receiving_address, wallet, contract_address);
    }
    console.log(send_token);
  }


  send_token(
    send_token_amount: string,
    to_address: string, // receiving address
    wallet: Wallet,
    contract_address?: any
  )

  {
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
          nonce: wallet.provider.getTransactionCount(wallet.address, "latest"),
          gasLimit: ethers.utils.hexlify(gas_limit), // 100000
          gasPrice: gas_price,
        }


        try {
          wallet.sendTransaction(tx).then((transaction) => {
            alert('transaction has been initiated');
            console.log(transaction);
          })
        } catch (error) {
          alert("failed to send!!")
          console.log('error sending transaction');
        }
      }
    });
  }



  async estimateGasFee(wallet: Wallet) {
    let gasPrice = await wallet.provider.getGasPrice();

    if(gasPrice)  {
      gasPrice = gasPrice.mul(this.gas_limit);
    }

    return utils.formatEther(gasPrice).toString();
  }

}
