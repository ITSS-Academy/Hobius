import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-not-signed-in-dialog',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './not-signed-in-dialog.component.html',
  styleUrl: './not-signed-in-dialog.component.scss',
})
export class NotSignedInDialogComponent {}
