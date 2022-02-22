import { Component, OnInit } from '@angular/core';
import {NbMenuItem} from "@nebular/theme";

@Component({
  selector: 'app-wallet-layout',
  templateUrl: './wallet-layout.component.html',
  styleUrls: ['./wallet-layout.component.css']
})
export class WalletLayoutComponent implements OnInit {

  menu_items: NbMenuItem[] = [
    {
      title: 'Dashboard',
      link: '/wallet/dashboard'
    },
    {
      title: 'Send Transaction',
      link: '/wallet/send-transaction'
    },
    {
      title: 'Swap',
      link: '/wallet/swap'
    },
    {
      title: 'Logout',
      link: ''
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
