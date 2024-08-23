import {Component, Inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MaterialModule} from "../../../../../shared/modules/material.module";

@Component({
  selector: 'app-add-input-comment-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatIcon,
    MatIconButton,
    MaterialModule,
    MatDialogClose
  ],
  templateUrl: './add-input-comment-dialog.component.html',
  styleUrl: './add-input-comment-dialog.component.scss'
})
export class AddInputCommentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddInputCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { newCommentText: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
