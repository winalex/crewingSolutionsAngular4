import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  title: string;

  constructor(public dialogRef: MdDialogRef<ProgressComponent>) {

  }


  ngOnInit() {
  }

}
