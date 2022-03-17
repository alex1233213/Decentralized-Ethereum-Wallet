import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-new-acc-dialog',
  templateUrl: './new-acc-dialog.component.html',
  styleUrls: ['./new-acc-dialog.component.css']
})
export class NewAccDialogComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<NewAccDialogComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
