import { Component } from '@angular/core';

import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { EbookFormDialogComponent } from '../../../../components/ebook-form-dialog/ebook-form-dialog.component';
import { CloudStorageService } from '../../../../../services/cloud-storage.service';
import { FileUploadState } from '../../../../../ngrxs/file-upload/file-upload.state';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardService } from '../../../../../services/card.service';
import { CategoryState } from '../../../../../ngrxs/category/category.state';

@Component({
  selector: 'app-add-ebook-form-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './add-ebook-form-dialog.component.html',
  styleUrl: './add-ebook-form-dialog.component.scss',
})
export class AddEbookFormDialogComponent extends EbookFormDialogComponent {
  constructor(
    protected override store: Store<{
      file_upload: FileUploadState;
      category: CategoryState;
    }>,
    protected override _snackBar: MatSnackBar,
    protected override cardService: CardService,
  ) {
    super(cardService, store, _snackBar);
  }
}
