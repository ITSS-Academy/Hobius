import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { AsyncPipe } from '@angular/common';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { CommentModel } from '../../../../../models/comment.model';

@Component({
  selector: 'app-add-input-comment-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MaterialModule,
    SharedModule,
  ],
  templateUrl: './add-input-comment-dialog.component.html',
  styleUrl: './add-input-comment-dialog.component.scss',
})
export class AddInputCommentDialogComponent implements OnInit {
  commentFormGroup = new FormGroup({
    content: new FormControl('', [Validators.required]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: CommentModel) {}

  ngOnInit(): void {
    if (this.data) {
      this.commentFormGroup.patchValue({ content: this.data.content });
    }
  }

  sendForm() {
    // console.log(this.ebookFormGroup.value);
    return this.commentFormGroup.value;
  }
}
