import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { EbookFormDialogComponent } from '../../../../components/ebook-form-dialog/ebook-form-dialog.component';

@Component({
  selector: 'app-add-ebook-form-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './add-ebook-form-dialog.component.html',
  styleUrl: './add-ebook-form-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEbookFormDialogComponent extends EbookFormDialogComponent {
  constructor() {
    super();
  }
}
