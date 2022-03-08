import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoService {
  coinsMarketsUrl: string = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=usd-coin%2C%20ethereum%2C%20basic-attention-token%2C%20the-sandbox&order=market_cap_desc&per_page=5&page=1&sparkline=false";

  constructor(private http: HttpClient) { }

  getTokensData() {
    return this.http.get(this.coinsMarketsUrl);
  }
}
