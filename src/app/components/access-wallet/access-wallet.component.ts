import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-access-wallet',
  templateUrl: './access-wallet.component.html',
  styleUrls: ['./access-wallet.component.css']
})
export class AccessWalletComponent implements OnInit {

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
      // this.router.navigate(['dashboard']);
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
