import { Component, Input } from '@angular/core';
import { EbookModel } from '../../../models/ebook.model';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() ebook!: EbookModel;

  constructor() {}
}
