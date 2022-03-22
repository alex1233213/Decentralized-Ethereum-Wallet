import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Token } from "../../../shared/utils/types/Token";
import { ethers, Wallet } from "ethers";
import { SwapService } from "../../../services/swap/swap.service";
import { ProviderService } from "../../../services/provider/provider.service";
import { tradeAmountValidator } from "../../../shared/validators/tradeAmountValidator";
import { NbDialogService } from "@nebular/theme";
import { swapTokensValidator } from "../../../shared/validators/swapTokensValidator";

@Component({
  selector: 'app-swap-form',
  templateUrl: './swap-form.component.html',
  styleUrls: ['./swap-form.component.css']
})
export class SwapFormComponent implements OnInit {

  swap_form: FormGroup;
  default_selected_token: Token;
  provider: ethers.providers.InfuraProvider;
  @Input() wallet: Wallet;
  @Input() tokens_data: Token[];

  constructor(private swapService: SwapService,
              private providerService: ProviderService,
              private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.default_selected_token = this.tokens_data[0];

    this.providerService.getProvider().subscribe( (provider) => {
      this.provider = provider;
      this.initializeForm();
    });

  }

  //TODO ADD VALIDATION
  initializeForm() {
    this.swap_form = new FormGroup({
      from_token: new FormControl(this.default_selected_token),
      to_token: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    }, { validators:  [tradeAmountValidator(), swapTokensValidator()]});
  }


  get from_token() {
    return this.swap_form.get('from_token') as FormControl;
  }

  get to_token() {
    return this.swap_form.get('to_token') as FormControl;
  }

  get amount() {
    return this.swap_form.get('amount') as FormControl;
  }



  // async reviewSwap() {
  //   if
  //   (
  //     this.to_token.value != ''
  //     &&
  //     this.to_token.value != null
  //     &&
  //     this.amount.value != null
  //     &&
  //     this.from_token.value != this.to_token.value
  //   )
  //   {
  //     this.swapService.swap_tokens
  //     (
  //       this.from_token.value,
  //       this.to_token.value,
  //       this.amount.value.toString(),
  //       this.provider
  //     );
  //   }
  // }



  async estimateSwap() {
    console.log(this.from_token.value);
    console.log(this.to_token.value);
    console.log(this.amount.value);

    if
    (
      this.to_token.value != ''
      &&
      this.to_token.value != null
      &&
      this.amount.value != null
      &&
      this.from_token.value != this.to_token.value
    )
    {
      this.swapService.swap_tokens
      (
        this.from_token.value,
        this.to_token.value,
        this.amount.value.toString(),
        this.provider
      );
    }
  }
}
