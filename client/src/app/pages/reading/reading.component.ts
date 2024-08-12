import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { ExamplePdfViewerComponent } from '../../components/example-pdf-viewer/example-pdf-viewer.component';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [SharedModule, MaterialModule, ExamplePdfViewerComponent],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss',
})
export class ReadingComponent implements OnInit {
  page = 1;

  ngOnInit(): void {}
}
