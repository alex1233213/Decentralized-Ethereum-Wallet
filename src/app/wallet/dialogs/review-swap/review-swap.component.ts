import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from "@nebular/theme";
import { Token } from "../../../shared/utils/types/Token";
import { SwapService } from "../../../services/swap/swap.service";
import {ethers, Wallet} from "ethers";
import { Trade } from "@uniswap/sdk";

@Component({
  selector: 'app-review-swap',
  templateUrl: './review-swap.component.html',
  styleUrls: ['./review-swap.component.css']
})
export class ReviewSwapComponent implements OnInit {

  from_token: Token;
  to_token: Token;
  input_amount: string;
  output_amount: number;
  price_output_unit: string;
  provider: ethers.providers.InfuraProvider;
  trade: Trade;
  loading_data: boolean;
  wallet: Wallet;
  gas_fee: string;

  constructor(protected dialogRef: NbDialogRef<ReviewSwapComponent>,
              private swapService: SwapService) { }

  async ngOnInit() {
    this.loading_data = true;
    await this.estimateGas();
    this.trade = await this.swapService.estimateExecutionPrice(this.from_token, this.to_token, this.input_amount, this.provider)
    console.log(this.trade);
    this.price_output_unit = this.trade.executionPrice.toSignificant(6);
    console.log(this.price_output_unit);
    this.output_amount = parseFloat(this.price_output_unit) * parseFloat(this.input_amount);
    this.loading_data = false;
  }


  close() {
    this.dialogRef.close();
  }


  submitTrade() {
    this.swapService.submitTrade(this.from_token, this.to_token, this.trade, this.wallet);
  }


  async estimateGas() {
    this.gas_fee = await this.swapService.estimateGasFee(this.wallet);
    console.log(this.gas_fee);
  }



}
