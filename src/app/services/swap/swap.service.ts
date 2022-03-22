import { Injectable } from '@angular/core';
import { ChainId, Fetcher, Route, TokenAmount, Trade, TradeType, WETH } from "@uniswap/sdk";
import { tokenAddresses } from "../../shared/utils/token_addresses/token-addresses";
import { Token } from "../../shared/utils/types/Token";
import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";


@Injectable({
  providedIn: 'root'
})
export class SwapService {

  chainId = ChainId.MAINNET;
  // token_address = ''

  constructor() { }

  async swap_tokens(
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

    console.log(`Execution Price ${ from_token.symbol } --> ${to_token.symbol}:`, trade.executionPrice.toSignificant(6));
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
}
