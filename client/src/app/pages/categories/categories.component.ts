import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { CardComponent } from '../../components/card/card.component';
import { NgForOf } from '@angular/common';
import { CardService } from '../../../services/card.service';
import { EbookModel } from '../../../models/ebook.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule, MaterialModule, CardComponent, NgForOf],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  theLoai: string[] = [
    'History',
    'Humor',
    'Mystery',
    'Non-fiction',
    'Philosophy',
    'Poetry',
    'Romance',
    'Religion',
    'Science fiction',
    'Short stories',
    'Teen',
    'Literature',
  ];

  constructor(private cardService: CardService) {}

  thinhHanhCards: EbookModel[] = [];

  ngOnInit(): void {
    this.thinhHanhCards = this.cardService.cards;
  }

  ngAfterViewInit() {}
}
