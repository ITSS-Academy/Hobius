import { Component, Inject, inject, input, signal } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserModel } from '../../../../../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EbookModel } from '../../../../../models/ebook.model';

@Component({
  selector: 'app-edit-profile-form-dialog',
  standalone: true,
  imports: [SharedModule, MaterialModule, MatDialogClose],
  templateUrl: './edit-profile-form-dialog.component.html',
  styleUrl: './edit-profile-form-dialog.component.scss',
})
export class EditProfileFormDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EditProfileFormDialogComponent>);

  profileFormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    avatarURL: new FormControl('', [Validators.required]),
    wallPaperURL: new FormControl('', [Validators.required]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: UserModel) {
    this.profileFormGroup.patchValue({ ...this.data });
  }

  sendForm() {
    // console.log(this.profileFormGroup.value);
    return this.profileFormGroup.value;
  }
}
