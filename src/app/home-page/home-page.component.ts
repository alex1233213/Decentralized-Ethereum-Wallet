import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  keystore: string | null;

  constructor() { }

  ngOnInit(): void {
    this.checkKeyStore();
  }

  checkKeyStore() {
    this.keystore = localStorage.getItem('keystore');
  }
}
