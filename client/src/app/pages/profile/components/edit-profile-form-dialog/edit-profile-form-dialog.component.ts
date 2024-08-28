import {
  Component,
  Inject,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserModel } from '../../../../../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EbookModel } from '../../../../../models/ebook.model';
import * as UploadActions from '../../../../../ngrxs/file-upload/file-upload.actions';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FileUploadState } from '../../../../../ngrxs/file-upload/file-upload.state';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile-form-dialog',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
  ],
  templateUrl: './edit-profile-form-dialog.component.html',
  styleUrl: './edit-profile-form-dialog.component.scss',
})
export class EditProfileFormDialogComponent implements OnInit, OnDestroy {
  userId = '';
  subscriptions: Subscription[] = [];
  isLoading$ = this.store.select('file_upload', 'isLoading');

  profileFormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    avatarURL: new FormControl('', [Validators.required]),
    wallPaperURL: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private store: Store<{
      file_upload: FileUploadState;
    }>,
    private _snackBar: MatSnackBar,
  ) {
    this.profileFormGroup.patchValue({ ...this.data });
    this.userId = this.data.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(UploadActions.resetUserUploadState());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('file_upload', 'downloadAvatarURL').subscribe((url) => {
        if (url != null) {
          this.profileFormGroup.patchValue({ avatarURL: url });
          this.openSnackbar('Đăng tải thành công');
        }
      }),
      this.store.select('file_upload', 'error').subscribe((error) => {
        if (error) {
          this.openSnackbar('Đăng tải thất bại');
        }
      }),
      this.store
        .select('file_upload', 'downloadWallpaperURL')
        .subscribe((url) => {
          if (url != null) {
            this.profileFormGroup.patchValue({ wallPaperURL: url });
            this.openSnackbar('Đăng tải thành công');
          }
        }),
    );
  }

  openSnackbar(msg: string) {
    this._snackBar.open(msg, 'Đóng', {
      duration: 5000,
    });
  }

  sendForm() {
    // console.log(this.profileFormGroup.value);
    return this.profileFormGroup.value;
  }

  onAvatarPicked(event: any) {
    const inputEvent = event as InputEvent;
    const file = (inputEvent.target as HTMLInputElement).files?.[0];
    this.store.dispatch(
      UploadActions.uploadAvatarFile({
        file: file!,
        path: `users/${this.userId}/avatar`,
        isPdf: false,
      }),
    );
  }

  onWallPaperPicked(event: any) {
    const inputEvent = event as InputEvent;
    const file = (inputEvent.target as HTMLInputElement).files?.[0];
    this.store.dispatch(
      UploadActions.uploadWallpaperFile({
        file: file!,
        path: `users/${this.userId}/wallpaper`,
        isPdf: false,
      }),
    );
  }
}
