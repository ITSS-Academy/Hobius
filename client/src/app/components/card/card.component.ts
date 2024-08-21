import { Component, Input, OnInit } from '@angular/core';
import { EbookModel } from '../../../models/ebook.model';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SkeletonCardComponent } from '../skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SharedModule, MaterialModule, SkeletonCardComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() ebook!: EbookModel;
  isLoading: boolean = true;

  constructor() {}

  ngOnInit(): void {
    // Simulate loading delay
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
