import { Injectable } from '@angular/core';
import { ChainId, Fetcher, WETH } from "@uniswap/sdk";
import { tokenAddresses } from "../../shared/utils/token_addresses/token-addresses";
import { Token } from "../../shared/utils/types/Token";

@Injectable({
  providedIn: 'root'
})
export class SwapService {

  chain_id = ChainId.MAINNET;
  // token_address = ''

  constructor() { }

  // async swap_tokens() {
  //   const dai = await Fetcher.fetchTokenData(this.chain_id, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', customHttpProvider);
  //   const weth = WETH[this.chain_id];
  //   const pair = await Fetcher.fetchPairData(dai, weth, customHttpProvider);
  //   const route = new Route([pair], weth);
  //   const trade = new Trade(route, new TokenAmount(weth, '100000000000000000'), TradeType.EXACT_INPUT);
  //   console.log("Mid Price WETH --> DAI:", route.midPrice.toSignificant(6));
  //   console.log("Mid Price DAI --> WETH:", route.midPrice.invert().toSignificant(6));
  //   console.log("-".repeat(45));
  //   console.log("Execution Price WETH --> DAI:", trade.executionPrice.toSignificant(6));
  //   console.log("Mid Price after trade WETH --> DAI:", trade.nextMidPrice.toSignificant(6));
  // }


  getTokenAddress(token: Token) {
    console.log(tokenAddresses[token.id]);
  }
}
