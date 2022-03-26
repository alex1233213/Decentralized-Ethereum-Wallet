import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  @Input() accounts: any;

  constructor() { }

  ngOnInit(): void {
  }

}
