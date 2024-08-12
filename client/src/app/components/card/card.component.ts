import { Component, Input } from '@angular/core';
import { EbookModel } from '../../../models/ebook.model';
import { CardService } from '../../../services/card.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() ebook!: EbookModel;

  constructor(private CardService: CardService) {}
}
