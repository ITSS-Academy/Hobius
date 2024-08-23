import {
  AfterViewInit,
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  OnInit,
} from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { CardComponent } from '../../components/card/card.component';
import { EbookModel } from '../../../models/ebook.model';
import { CardService } from '../../../services/card.service';
import { NgForOf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    CardComponent,
    NgForOf,
    SearchBarComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements AfterViewInit, OnInit {
  @ViewChildren('viewport') viewports!: QueryList<ElementRef>;
  theLoai: string[] = [];
  thinhHanhCards: EbookModel[] = [];
  headerName: string = '';

  constructor(
    private cardService: CardService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.theLoai = [
      'Lịch sử',
      'Hài hước',
      'Bí ẩn',
      'Phi hư cấu',
      'Triết học',
      'Thơ ca',
      'Lãng mạn',
      'Tôn giáo',
      'Viễn tưởng',
      'Truyện ngắn',
      'Tuổi teen',
      'Văn học',
    ]; // Example categories
    this.thinhHanhCards = this.cardService.cards;
    this.activatedRoute.paramMap.subscribe((params) => {
      const type = params.get('type');
      if (type) {
        switch (type) {
          case 'history':
            this.headerName = 'Lịch sử';
            break;
          case 'trends':
            this.headerName = 'Thịnh hành';
            break;
          case 'recommend':
            this.headerName = 'Đề cử';
            break;
          case 'rank':
            this.headerName = 'Bảng xếp hạng';
            break;
        }
      }
    });
  }

  ngAfterViewInit() {
    this.viewports.forEach((viewport) => {
      const slider = viewport.nativeElement as HTMLElement;
      let isDown = false;
      let startX: number;
      let scrollLeft: number;
      let velocity = 0;
      let lastMoveTime: number;
      let lastMoveX: number;

      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        lastMoveTime = Date.now();
        lastMoveX = e.pageX;
      });

      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });

      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
        applyInertia();
      });

      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.1; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;

        const now = Date.now();
        const deltaTime = now - lastMoveTime;
        const deltaX = e.pageX - lastMoveX;
        velocity = deltaX / deltaTime;

        lastMoveTime = now;
        lastMoveX = e.pageX;
      });

      function applyInertia() {
        const friction = 0.95;
        const step = () => {
          if (Math.abs(velocity) < 0.1) return;
          slider.scrollLeft -= velocity * 5;
          velocity *= friction;
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }

      // Add click event listener to toggle selected class
      const theLoaiElements = slider.querySelectorAll('.theLoai');
      theLoaiElements.forEach((element) => {
        element.addEventListener('click', () => {
          element.classList.toggle('selected');
        });
      });
    });
  }
}
