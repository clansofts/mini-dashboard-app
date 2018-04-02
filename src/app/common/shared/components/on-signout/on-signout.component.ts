import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-on-signout',
  templateUrl: './on-signout.component.html',
  styleUrls: ['./on-signout.component.scss']
})
export class OnSignoutComponent implements OnInit {

  constructor(public onSignoutComponentRef: MatDialogRef<OnSignoutComponent>) { }

  ngOnInit() {
  }

  optionQuery(option: boolean) {
    this.onSignoutComponentRef.close(option);
  }

}
