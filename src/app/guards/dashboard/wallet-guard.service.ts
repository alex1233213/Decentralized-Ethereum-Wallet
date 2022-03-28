/*
* Wallet guard injects the wallet service to check if wallet has
* been accessed, if it hasn't then it will prevent unauthenticated
* users to access the routes of the wallet, i.e. dashboard, etc.
* */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { WalletService } from "../../services/wallet/wallet.service";
import {Wallet} from "ethers";
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";

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
    state: RouterStateSnapshot): Observable<true | UrlTree> {

    return this.getWallet().pipe(
      map(wallet => {
        if (wallet == undefined) {
          return this.router.parseUrl('/');
        } else {
          return true;
        }
      })
    )
  }





  getWallet(): Observable<Wallet> {
    return this.walletService.getWallet().pipe(
      map((wallet: Wallet) => wallet)
    );
  }
}
