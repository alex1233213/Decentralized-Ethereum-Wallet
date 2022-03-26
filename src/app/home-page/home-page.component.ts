import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import { Router } from "@angular/router";
import {NbDialogService, NbPopoverDirective} from "@nebular/theme";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  keystore: string | null;
  @ViewChildren(NbPopoverDirective) popovers: QueryList<NbPopoverDirective>;

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

  restoreWallet() {
    this.router.navigate(['/restore']);
  }


  close() {
    this.popovers.forEach( p => p.hide() );
  }
}
