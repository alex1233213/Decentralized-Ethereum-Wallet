import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoService {
  coinsMarketsUrl: string = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=usd-coin%2C%20ethereum%2C%20basic-attention-token%2C%20the-sandbox&order=market_cap_desc&per_page=5&page=1&sparkline=false";

  constructor(private http: HttpClient) { }

  async getTokensData() {
    this.http.get<any>(this.coinsMarketsUrl).pipe(
      map(response => response.map( (coin: any) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: coin.image,
        current_price: coin.current_price,
        market_cap: coin.market_cap,
        price_change_24h: coin.price_change_24h,
      }))));
  }
}
