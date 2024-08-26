import { Component, Input, OnInit, HostListener } from '@angular/core';
import { EbookModel } from '../../../models/ebook.model';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SkeletonCardComponent } from '../skeleton-card/skeleton-card.component';
import { Router } from '@angular/router';

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
  private isMouseDown: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  private moved: boolean = false;
  private holdTimeout: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simulate loading delay
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.isMouseDown = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.moved = false;
    this.holdTimeout = setTimeout(() => {
      this.moved = true;
    }, 60);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isMouseDown) {
      const deltaX = Math.abs(event.clientX - this.startX);
      const deltaY = Math.abs(event.clientY - this.startY);
      if (deltaX > 0.1 || deltaY > 0.1) {
        this.moved = true;
        clearTimeout(this.holdTimeout);
      }
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.isMouseDown = false;
    clearTimeout(this.holdTimeout);
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.moved) {
      this.router.navigate(['/ebook-info', this.ebook.id]).then();
    }
  }
}
