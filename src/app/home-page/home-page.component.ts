import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NbDialogService} from "@nebular/theme";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  keystore: string | null;

  constructor(
    private router: Router,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.checkKeyStore();
  }

  checkKeyStore() {
    this.keystore = localStorage.getItem('keystore');
  }

  unlockWallet() {
    this.router.navigate(['/access']);
  }

  createWallet() {
    this.router.navigate(['/create'])
  }

  restoreWallet() {
    // this.dialogService.open(ShowcaseDialogComponent, {
    //   context: {
    //     title: 'This is a title passed to the dialog component',
    //   },
    // });
    // this.router.navigate(['/restore'])
  }
}
