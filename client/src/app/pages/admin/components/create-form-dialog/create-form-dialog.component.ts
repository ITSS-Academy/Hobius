import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-form-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './create-form-dialog.component.html',
  styleUrl: './create-form-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormDialogComponent implements OnInit {
  ebookFormGroup!: FormGroup;
  title = new FormControl('', [Validators.required]);
  author = new FormControl('', [Validators.required]);
  detail = new FormControl('', [Validators.required]);
  pdf = new FormControl('', [Validators.required]);
  genre = new FormControl([], [Validators.required]);

  ngOnInit(): void {}

  titleErrorMessage = signal('');
  authorErrorMessage = signal('');
  detailErrorMessage = signal('');
  pdfErrorMessage = signal('');
  genreErrorMessage = signal('');

  constructor() {
    this.ebookFormGroup.addControl('title', this.title);
    this.ebookFormGroup.addControl('author', this.author);
    this.ebookFormGroup.addControl('detail', this.detail);
    this.ebookFormGroup.addControl('pdf', this.pdf);
    this.ebookFormGroup.addControl('genre', this.genre);

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
    merge(this.genre.statusChanges, this.genre.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateGenreErrorMessage());
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
      this.pdfErrorMessage.set('You must enter a value');
    } else {
      this.pdfErrorMessage.set('');
    }
  }

  updateGenreErrorMessage() {
    if (this.genre.hasError('required')) {
      this.genreErrorMessage.set('You must enter a value');
    } else {
      this.genreErrorMessage.set('');
    }
  }
}
