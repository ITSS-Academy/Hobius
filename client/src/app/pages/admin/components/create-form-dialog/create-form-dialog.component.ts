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
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GENRES } from '../../admin.component';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

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
  genre = new FormControl('', [Validators.required]);
  image = new FormControl('', [Validators.required]);

  genreList = GENRES;
  genreMatcher = new MyErrorStateMatcher();

  ngOnInit(): void {}

  titleErrorMessage = signal('');
  authorErrorMessage = signal('');
  detailErrorMessage = signal('');
  pdfErrorMessage = signal('');
  imageErrorMessage = signal('');

  constructor() {
    this.ebookFormGroup = new FormGroup({
      title: this.title,
      author: this.author,
      detail: this.detail,
      pdf: this.pdf,
      genre: this.genre,
      image: this.image,
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
      this.pdfErrorMessage.set(`You must upload ebook's pdf file`);
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
}
