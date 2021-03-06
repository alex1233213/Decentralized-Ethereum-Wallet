import { Injectable } from '@angular/core';
import { BigNumber, ethers, utils, Wallet } from "ethers";
import { tokens } from "../../shared/utils/token_addresses/tokens";
import { abi } from "../../shared/utils/abi/erc-20-ABI";
import { NonceManager } from "@ethersproject/experimental";
import { Token } from "../../shared/utils/types/Token";
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {


  constructor(private toastrSerivce: NbToastrService) { }

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
        const send_token = tokens.find( (token: any) => token.name == send_token_id);
        
        this.send_token(send_amount, receiving_address, wallet, send_token);
      }
  }


  send_token(
    send_token_amount: string,
    to_address: string, // receiving address
    wallet: Wallet,
    send_token?: any
  )

  {
    const nonce_manager = new NonceManager(wallet);

    wallet.provider.getGasPrice().then((currentGasPrice: BigNumber) => {
      let gas_price = ethers.utils.hexlify(currentGasPrice);
      console.log(`gas_price: ${utils.formatEther(gas_price)}`);

      //If sending ERC-20 token, contract_address will be supplied
      if (send_token) {

        let contract = new ethers.Contract(
          send_token.contract_address,
          abi,
          wallet
        );

        //convert the sending amount based on number of decimals
        let send_amount = ethers.utils.parseUnits(send_token_amount, send_token.decimals);
        console.log(`sending amount: ${send_amount}`);

        // Send tokens
        contract['transfer'](to_address, send_amount).then( (transferResult: any) => {
          this.showToast(transferResult);
        });


      } else { // send ethereum

        let gas_limit = 21000;

        const tx = {
          from: wallet.address,
          to: to_address,
          value: ethers.utils.parseEther(send_token_amount),
          gasLimit: ethers.utils.hexlify(gas_limit),
          gasPrice: gas_price,
        }


        try {
          this.toastrSerivce.show('Transaction has been sent to the miner pool', 'Transaction Initiated', {duration: 3000, icon: ''});
          nonce_manager.sendTransaction(tx).then((transaction) => {
            this.showToast(transaction.hash);
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
    const eth_gas_limit = 21000;
    // @ts-ignore
    let gasFee = (await wallet.provider.getFeeData()).maxFeePerGas.mul(eth_gas_limit);

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
      let contract_address = tokens[send_token.id];

      gasFee = await this.estimateErc20GasFee(contract_address, wallet);
    }

    return gasFee;
  }


  showToast(message: any) { 
    this.toastrSerivce.show(`${message}`, 'Transaction hash', { duration: 5000, icon: '', destroyByClick: false});
  }

}
