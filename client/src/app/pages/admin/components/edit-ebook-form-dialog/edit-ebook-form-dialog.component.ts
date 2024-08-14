import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { EbookModel } from '../../../../../models/ebook.model';
import { EbookFormDialogComponent } from '../../../../components/ebook-form-dialog/ebook-form-dialog.component';

@Component({
  selector: 'app-edit-ebook-form-dialog',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './edit-ebook-form-dialog.component.html',
  styleUrl: './edit-ebook-form-dialog.component.scss',
})
export class EditEbookFormDialogComponent extends EbookFormDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: EbookModel) {
    super();
    console.log(data);
    this.ebookFormGroup.patchValue({ ...data });
  }
}
