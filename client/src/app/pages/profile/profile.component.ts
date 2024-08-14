import { Component } from '@angular/core';

import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.open('Đã bỏ theo dõi', 'Đóng', {
      duration: 1000,
      panelClass: ['snackbar'],
    });
  }
}
