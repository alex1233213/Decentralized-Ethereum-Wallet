import { Component, OnInit } from '@angular/core';
import Moralis from "moralis";

@Component({
  selector: 'app-wallet-layout',
  templateUrl: './wallet-layout.component.html',
  styleUrls: ['./wallet-layout.component.css']
})
export class WalletLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  async buyEther() {
    // await Moralis.initPlugins();
    //
    // Moralis.Plugins['fiat'].buy();
  }
}
