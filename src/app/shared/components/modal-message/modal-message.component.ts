import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}