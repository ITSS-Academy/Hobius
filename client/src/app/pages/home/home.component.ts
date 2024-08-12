import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {}
}
