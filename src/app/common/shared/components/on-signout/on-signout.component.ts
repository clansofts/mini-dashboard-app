import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-on-signout',
  templateUrl: './on-signout.component.html',
  styleUrls: ['./on-signout.component.scss']
})
export class OnSignoutComponent implements OnInit {

  option: boolean = false;

  constructor(public onSignoutComponentRef: MatDialogRef<OnSignoutComponent>) { }

  ngOnInit() {
  }

  optionQuery() {
    this.option = true;
    setTimeout(() => this.onSignoutComponentRef.close(this.option), 1);
  }

  handleKeyPress(event: KeyboardEvent) {
    const option = [ENTER].includes(event.keyCode);
    this.option = option ? option : !option;
  }

}
