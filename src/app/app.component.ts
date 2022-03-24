import { Component, OnInit } from '@angular/core';
import Moralis from "moralis";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const serverUrl = "https://bc1ythclfw8q.usemoralis.com:2053/server";
    const appId = "bdLAmkz1JGCf5yMNEV3SEjIlAENeJQa5udTpuBwh";
    Moralis.start({ serverUrl, appId });
  }

}
