import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-readme-dialog',
  templateUrl: './readme-dialog.component.html',
  styleUrls: ['./readme-dialog.component.scss']
})
export class ReadmeDialogComponent {

  constructor(private dialogRef: MatDialogRef<ReadmeDialogComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
