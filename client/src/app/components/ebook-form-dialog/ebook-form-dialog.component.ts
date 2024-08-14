import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
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
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class EbookFormDialogComponent {
  ebookFormGroup: FormGroup;
  genreList = GENRES;

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

  constructor() {
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

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.ebookFormGroup.patchValue({ image: file!.name });
  }

  onPdfPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.ebookFormGroup.patchValue({ pdf: file!.name });
  }

  sendForm() {
    // console.log(this.ebookFormGroup.value);
    return this.ebookFormGroup.value;
  }
}
