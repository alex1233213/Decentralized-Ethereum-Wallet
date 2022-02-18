import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  keystore: string | null;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkKeyStore();
  }

  checkKeyStore() {
    this.keystore = localStorage.getItem('keystore');
  }

  unlockWallet() {
    this.router.navigate(['/unlock']);
  }

  createWallet() {
    this.router.navigate(['/create']);
  }

  // restoreWallet() {
  //   this.router.navigate(['/restore']);
  // }
}
