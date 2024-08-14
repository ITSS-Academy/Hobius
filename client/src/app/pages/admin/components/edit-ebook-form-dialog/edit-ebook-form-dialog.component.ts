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
import { CloudStorageService } from '../../../../../services/cloud-storage.service';
import { Store } from '@ngrx/store';
import { FileUploadState } from '../../../../../ngrx/file-upload/file-upload.state';
import * as console from 'node:console';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EbookModel,
    protected override cloudStorageService: CloudStorageService,
    protected override store: Store<{ file_upload: FileUploadState }>,
    protected override _snackBar: MatSnackBar,
  ) {
    super(cloudStorageService, store, _snackBar);
    console.log(data);
    this.ebookFormGroup.patchValue({ ...data });
  }
}
