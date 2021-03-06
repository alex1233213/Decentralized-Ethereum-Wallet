import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoService {
  coinsMarketsUrl: string = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2Cbasic-attention-token%2Chex%2Cdai%2Cusd-coin%2Cthe-sandbox%2Cuniswap&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  constructor(private http: HttpClient) { }

  getTokensData() {
    return this.http.get(this.coinsMarketsUrl).pipe(
      map( (response: any) => response.map( (coin: any) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: coin.image,
        current_price: coin.current_price.toFixed(4),
        price_change_percentage_24h: coin.price_change_percentage_24h.toFixed(2),
      }))));
  }


  getEthPrice() {
    return this.http
      .get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      .toPromise();
  }


  getErc20TokenPrice(token_id: string) {
    return this.http
      .get(`https://api.coingecko.com/api/v3/simple/price?ids=${token_id}&vs_currencies=usd`)
      .toPromise();
  }
}
