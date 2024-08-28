import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { ExamplePdfViewerComponent } from '../../components/example-pdf-viewer/example-pdf-viewer.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EbookState } from '../../../ngrxs/ebook/ebook.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [SharedModule, MaterialModule, ExamplePdfViewerComponent],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss',
})
export class ReadingComponent implements OnInit, OnDestroy {
  page = 1;
  pdfUrl: string = '';
  subscriptions: Subscription[] = [];

  constructor(private store: Store<{ ebook: EbookState }>) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('ebook', 'selectedEbook').subscribe((ebook) => {
        if (ebook) {
          this.pdfUrl = ebook.pdf;
        }
      }),
    );
  }
}
