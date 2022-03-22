import { Injectable } from '@angular/core';
import { ChainId, Fetcher, Percent, Route, TokenAmount, Trade, TradeType, WETH } from "@uniswap/sdk";
import { tokenAddresses } from "../../shared/utils/token_addresses/token-addresses";
import { Token } from "../../shared/utils/types/Token";
import { BigNumber, ethers, utils, Wallet } from "ethers";
import { parseUnits } from "ethers/lib/utils";


@Injectable({
  providedIn: 'root'
})
export class SwapService {

  chainId = ChainId.MAINNET;

  constructor() { }

  async estimateExecutionPrice(
    from_token: Token,
    to_token: Token,
    input_amount_units: string,
    provider: ethers.providers.InfuraProvider
  ) {

    const input_token = await this.getTokenForTrade(from_token);
    const output_token = await this.getTokenForTrade(to_token);

    const input_amount_parsed = parseUnits(input_amount_units, input_token.decimals).toString();
    console.log(input_amount_parsed.toString());

    const pair = await Fetcher.fetchPairData(input_token, output_token, provider);
    const route = new Route([pair], input_token);
    const trade = new Trade(route, new TokenAmount(input_token, input_amount_parsed), TradeType.EXACT_INPUT);

    // console.log(`Mid Price ${ from_token.symbol } --> ${to_token.symbol}:`, route.midPrice.toSignificant(6));
    // console.log(`Mid Price ${ to_token.symbol } --> ${from_token.symbol}:`, route.midPrice.invert().toSignificant(6));
    return trade;
    // console.log(`Execution Price ${ from_token.symbol } --> ${to_token.symbol}:`, trade.executionPrice.toSignificant(6));
  }



  async submitTrade(
    from: Token,
    to: Token,
    trade: Trade,
    wallet: Wallet
  )
  {
    const input_token = await this.getTokenForTrade(from);
    const output_token = await this.getTokenForTrade(to);

    const slippage_tolerance = new Percent('50', '10000') //50 bips, 1 bip = 0.001
    const amountOutMin = trade.minimumAmountOut(slippage_tolerance).raw;
    const path = [input_token.address, output_token.address];
    console.log(path);
    const to_address = ethers.utils.getAddress(wallet.address);
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10;
    const value = trade.inputAmount.raw;
    console.log(value);

    const uniswap = new ethers.Contract(
      '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'],
      wallet
    );

    const gas_price = await wallet.provider.getFeeData().then( feedata => feedata.maxFeePerGas?.toNumber());
    console.log(gas_price);


    // ***USING STRINGS *****
    // @ts-ignore
    // const gas_limit = await uniswap.estimateGas.swapExactETHForTokens(
    //   String(amountOutMin),
    //   path,
    //   to_address,
    //   deadline,
    //   { value: String(value), gasPrice: gas_price }
    // );


    // **** ORIGINAL *****
    const tx = await uniswap['swapExactETHForTokens'](
      String(amountOutMin),
      path,
      to_address,
      deadline,
      { value: String(value), gasPrice: gas_price, gasLimit: 100000 }
    );

    alert('Swap initiated .. transaction hash: ' + tx.hash);
  }




  async getTokenForTrade(token: Token) {
    let result;

    //get the address of the token
    const token_address = tokenAddresses[token.id];

    //if the token does not have an address, then it is ethereum
    if( tokenAddresses[token.id] == undefined ) {
      //convert ether to wrapped ether
      result = WETH[this.chainId];
    } else {
      result = await Fetcher.fetchTokenData(this.chainId, token_address);
    }

    return result;
  }



  async estimateGasFee(wallet: Wallet) {
    let swap_gas_limit_wei: number = 200000;
    let swap_gas_limit_bn: BigNumber = BigNumber.from(swap_gas_limit_wei);



    let gas_fee: BigNumber = (await wallet.provider.getFeeData()).maxFeePerGas!.mul(swap_gas_limit_bn);

    return utils.formatEther(gas_fee);
  }


}
