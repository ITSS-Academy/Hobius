import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-ebook-info',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    FormsModule
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
}
