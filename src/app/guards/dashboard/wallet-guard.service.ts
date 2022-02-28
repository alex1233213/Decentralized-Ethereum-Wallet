/*
* Wallet guard injects the wallet service to check if wallet has
* been accessed, if it hasn't then it will prevent unauthenticated
* users to access the routes of the wallet, i.e. dashboard, etc.
* */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { WalletService } from "../../services/wallet/wallet.service";

@Injectable({
  providedIn: 'root'
})
export class WalletGuard implements CanActivate {

  constructor
  (
    private walletService: WalletService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
      if(this.walletService.wallet == undefined) {
        return this.router.parseUrl('/');
      } else {
        return true;
      }
  }

}
