import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { WalletService } from "../services/wallet.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-unlock-wallet',
  templateUrl: './unlock-wallet.component.html',
  styleUrls: ['./unlock-wallet.component.css']
})
export class UnlockWalletComponent implements OnInit {

  password: FormControl = new FormControl('');

  loadingWallet: boolean;
  login_error: string;

  constructor(
    private walletService: WalletService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async accessWallet() {
    this.loadingWallet = true;
    this.login_error = '';

    try {
      await this.walletService.accessWallet(this.password.value);
      this.router.navigate(['/wallet/dashboard']);
    } catch (err: any) {
      // this.login_error = 'Error unlocking wallet - possibly wrong password';
      setTimeout( () => {
        this.login_error = '';
      }, 4000);

      this.login_error = 'Error unlocking wallet - possibly wrong password';
    }

    this.loadingWallet = false;
  }

}
