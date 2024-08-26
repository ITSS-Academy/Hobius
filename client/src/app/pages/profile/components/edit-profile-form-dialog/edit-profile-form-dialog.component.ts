import { Component, inject, input, signal } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile-form-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatSelect,
    MatOption,
    SharedModule,
    MaterialModule,
  ],
  templateUrl: './edit-profile-form-dialog.component.html',
  styleUrl: './edit-profile-form-dialog.component.scss',
})
export class EditProfileFormDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EditProfileFormDialogComponent>);

  user = {
    name: 'Gia Huy',
    email: 'dhghuy@gmail.com',
    phone: '0123456789',
    avatarURL: 'Null',
    backgroundImgURL: 'Null',
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  alertSuccess() {
    alert('Cập nhật thông tin thành công');
  }
}
