import { Component } from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {FormsModule} from "@angular/forms";
import {CdkFixedSizeVirtualScroll} from "@angular/cdk/scrolling";

@Component({
  selector: 'app-ebook-info',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    FormsModule,
    MatIconButton,
    CdkFixedSizeVirtualScroll
  ],
  templateUrl: './ebook-info.component.html',
  styleUrls: ['./ebook-info.component.scss']
})
export class EbookInfoComponent {
  isCommentInputVisible: boolean = false;

  toggleCommentInput(): void {
    this.isCommentInputVisible = !this.isCommentInputVisible;
  }
  newCommentText: string = '';
  comments: { name: string, text: string }[] = [];
  addComment(): void {
    if (this.newCommentText.trim()) {
      this.comments.push({ name: 'Tôi', text: this.newCommentText });
      this.newCommentText = '';
      this.isCommentInputVisible = false;
    }
  }
  isFavorite: boolean = false;
  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }
}
