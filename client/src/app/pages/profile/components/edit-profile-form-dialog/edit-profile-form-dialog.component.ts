import { Component, inject, signal } from '@angular/core';
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
  ngaySinh = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  thangSinh = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  namSinh = [
    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
    2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
    2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
  ];

  readonly dialogRef = inject(MatDialogRef<EditProfileFormDialogComponent>);

  onNoClick(): void {
    this.dialogRef.close();
  }

  alertSuccess() {
    alert('Cập nhật thông tin thành công');
  }
}
