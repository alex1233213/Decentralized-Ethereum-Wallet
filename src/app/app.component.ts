import { Component, OnInit } from '@angular/core';
import { Wallet } from "ethers";
import { WalletService } from "./services/wallet.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }

}
