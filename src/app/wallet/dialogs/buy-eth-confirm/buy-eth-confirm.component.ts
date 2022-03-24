import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: 'app-buy-eth-confirm',
  templateUrl: './buy-eth-confirm.component.html',
  styleUrls: ['./buy-eth-confirm.component.css']
})
export class BuyEthConfirmComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<BuyEthConfirmComponent>) { }

  ngOnInit(): void {
  }


  close() {
    this.dialogRef.close();
  }


  confirm() {
    this.dialogRef.close(true);
  }


}
