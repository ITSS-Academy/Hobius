import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { GENRES } from '../../pages/admin/admin.component';
import { merge, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CloudStorageService } from '../../../services/cloud-storage.service';
import { Store } from '@ngrx/store';
import { FileUploadState } from '../../../ngrxs/file-upload/file-upload.state';
import * as UploadActions from '../../../ngrxs/file-upload/file-upload.actions';
import { Event } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ebook-form-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  template: '',
  styleUrls: ['./ebook-form-dialog.component.scss'],
})
export class EbookFormDialogComponent implements OnInit, OnDestroy {
  tempId = Date.now().toString();
  ebookFormGroup: FormGroup;
  genreList = GENRES;
  isLoading = false;
  subscriptions: Subscription[] = [];

  title = new FormControl('', [Validators.required]);
  author = new FormControl('', [Validators.required]);
  detail = new FormControl('', [Validators.required]);
  genre = new FormControl('', [Validators.required]);
  pdf = new FormControl(null, [Validators.required]);
  image = new FormControl(null, [Validators.required]);

  titleErrorMessage = signal('');
  authorErrorMessage = signal('');
  detailErrorMessage = signal('');
  pdfErrorMessage = signal('');
  imageErrorMessage = signal('');

  constructor(
    protected cloudStorageService: CloudStorageService,
    protected store: Store<{
      file_upload: FileUploadState;
    }>,
    protected _snackBar: MatSnackBar,
  ) {
    this.ebookFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      detail: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      pdf: new FormControl('', [Validators.required]),
      genre: new FormControl([], [Validators.required]),
    });

    merge(this.title.statusChanges, this.title.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateTitleErrorMessage());
    merge(this.author.statusChanges, this.author.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateAuthorErrorMessage());
    merge(this.detail.statusChanges, this.detail.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateDetailErrorMessage());
    merge(this.pdf.statusChanges, this.pdf.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePdfErrorMessage());
    merge(this.image.statusChanges, this.image.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateImageErrorMessage());

    this.store
      .select('file_upload', 'downloadPdfURL')
      .pipe(takeUntilDestroyed())
      .subscribe((downloadURL) => {
        if (downloadURL != null && downloadURL != '') {
          this.ebookFormGroup.patchValue({ pdf: downloadURL });
        }
      });

    this.store
      .select('file_upload', 'downloadCoverURL')
      .pipe(takeUntilDestroyed())
      .subscribe((downloadURL) => {
        if (downloadURL != null && downloadURL != '') {
          this.ebookFormGroup.patchValue({ image: downloadURL });
        }
      });
  }

  updateTitleErrorMessage() {
    if (this.title.hasError('required')) {
      this.titleErrorMessage.set('You must enter a value');
    } else {
      this.titleErrorMessage.set('');
    }
  }

  updateAuthorErrorMessage() {
    if (this.author.hasError('required')) {
      this.authorErrorMessage.set('You must enter a value');
    } else {
      this.authorErrorMessage.set('');
    }
  }

  updateDetailErrorMessage() {
    if (this.detail.hasError('required')) {
      this.detailErrorMessage.set('You must enter a value');
    } else {
      this.detailErrorMessage.set('');
    }
  }

  updatePdfErrorMessage() {
    if (this.pdf.hasError('required')) {
      this.pdfErrorMessage.set(`You must upload ebook pdf file`);
    } else {
      this.pdfErrorMessage.set('');
    }
  }

  updateImageErrorMessage() {
    if (this.image.hasError('required')) {
      this.imageErrorMessage.set('You must upload ebook cover');
    } else {
      this.imageErrorMessage.set('');
    }
  }

  onImagePicked(event: any) {
    const inputEvent = event as InputEvent;
    const file = (inputEvent.target as HTMLInputElement).files?.[0];
    this.store.dispatch(
      UploadActions.uploadEbookCoverFile({
        file: file!,
        path: `ebooks/${this.tempId}/cover`,
      }),
    );
  }

  onPdfPicked(event: any) {
    const inputEvent = event as InputEvent;
    const file = (inputEvent.target as HTMLInputElement).files?.[0];
    this.store.dispatch(
      UploadActions.uploadEbookPdfFile({
        file: file!,
        path: `ebooks/${this.tempId}/pdf`,
      }),
    );
  }

  sendForm() {
    // console.log(this.ebookFormGroup.value);
    return this.ebookFormGroup.value;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('file_upload', 'downloadCoverURL').subscribe((url) => {
        if (url != null) {
          this._snackBar.open('File uploaded successfully', 'Close', {
            duration: 5000,
          });
        }
      }),
      this.store.select('file_upload', 'downloadPdfURL').subscribe((url) => {
        if (url != null) {
          this._snackBar.open('File uploaded successfully', 'Close', {
            duration: 5000,
          });
        }
      }),
      this.store.select('file_upload', 'isLoading').subscribe((isLoading) => {
        this.isLoading = isLoading;
      }),
      this.store.select('file_upload', 'error').subscribe((error) => {
        if (error) {
          this._snackBar.open('Error uploading file', 'Close', {
            duration: 5000,
          });
        }
      }),
    );
  }
}
