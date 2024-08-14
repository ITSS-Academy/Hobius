import { Component, OnInit } from '@angular/core';
import {
  MatButton,
  MatFabButton,
  MatIconButton,
} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CdkFixedSizeVirtualScroll } from '@angular/cdk/scrolling';
import { NavigationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-ebook-info',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    FormsModule,
    MatIconButton,
    CdkFixedSizeVirtualScroll,
    MatFabButton,
  ],
  templateUrl: './ebook-info.component.html',
  styleUrls: ['./ebook-info.component.scss'],
})
export class EbookInfoComponent implements OnInit {
  isCommentInputVisible: boolean = false;
  newCommentText: string = '';
  comments: { name: string; text: string }[] = [];
  isFavorite: boolean = false;
  isHovering: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleCommentInput(): void {
    this.isCommentInputVisible = !this.isCommentInputVisible;
  }

  addComment(): void {
    if (this.newCommentText.trim()) {
      this.comments.push({ name: 'Tôi', text: this.newCommentText });
      this.newCommentText = '';
      this.isCommentInputVisible = false;
    }
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  onMouseEnter(): void {
    this.isHovering = true;
  }

  onMouseLeave(): void {
    this.isHovering = false;
  }

  navigateBack(): void {
    this.router.navigate(['/']).then(() => {});
  }
}
