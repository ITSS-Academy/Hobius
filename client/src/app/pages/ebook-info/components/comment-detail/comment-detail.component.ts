import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { CommentModel } from '../../../../../models/comment.model';

@Component({
  selector: 'app-comment-detail',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MaterialModule,
    SharedModule,
    MatDialogClose,
  ],
  templateUrl: './comment-detail.component.html',
  styleUrl: './comment-detail.component.scss',
})
export class CommentDetailComponent {
  readonly data = inject<CommentModel>(MAT_DIALOG_DATA);
}
