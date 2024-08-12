import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { CardComponent } from '../../components/card/card.component';
import { EbookModel } from '../../../models/ebook.model';
import { CardService } from '../../../services/card.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, SharedModule, CardComponent, NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  lichSuCards: EbookModel[] = [];
  thinhHanhCards: EbookModel[] = [];
  deCuCards: EbookModel[] = [];
  bangXepHangCards: EbookModel[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.lichSuCards = this.cardService.cards;
    this.thinhHanhCards = this.cardService.cards;
    this.deCuCards = this.cardService.cards;
    this.bangXepHangCards = this.cardService.cards;
  }

  ngAfterViewInit() {}
}
