import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-acc-dialog',
  templateUrl: './new-acc-dialog.component.html',
  styleUrls: ['./new-acc-dialog.component.css']
})
export class NewAccDialogComponent implements OnInit {

  account_name: FormControl = new FormControl('', Validators.required);

  constructor(protected dialogRef: NbDialogRef<NewAccDialogComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  create_account() {
    this.dialogRef.close(this.account_name.value);
  }
}
