import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren, inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddInputCommentDialogComponent } from './components/add-input-comment-dialog/add-input-comment-dialog.component'
import {CdkFixedSizeVirtualScroll} from "@angular/cdk/scrolling";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";

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
export class EbookInfoComponent implements AfterViewInit, OnInit {
  @ViewChildren('commentText') commentTextElements!: QueryList<ElementRef>;
  isCommentInputVisible: boolean = false;
  newCommentText: string = '';
  comments: { name: string; text: string, isExpanded: boolean, isOverflowing: boolean}[] = [
    { name: 'Nguyễn Văn B', text: 'Godamn, tôi chưa bao giờ đọc được quấn sách nào hay như vậy, các nhân này mà có ở ngoài đời thật thì sẽ thú vị như thế nào', isExpanded: false, isOverflowing:false },
    { name: 'Nguyễn Văn C', text: 'Xương rồng đơm lá, đơm hoa Nước ngọt đong đầy trên cao nguyên đá\n' +
        '              Là ngày Hoàng đế về nhà Bảy năm mòn mỏi, kiệu hoa đón ngài Vương\n' +
        '              triều màu Đỏ mất ngai Bao năm chờ đợi, mong ngày phục hưng Cuối\n' +
        '              cùng trời đã đông hừng Đế chế trở lại, chúc mừng Quỷ Vương!', isExpanded: false, isOverflowing: false }
  ];
  isFavorite: boolean = false;
  isHovering: boolean = false;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.checkTextOverflow();
  }
  resetExpandedStatus(): void {
    this.comments.forEach(comment => comment.isExpanded = false);
  }
  toggleCommentInput(): void {
    this.isCommentInputVisible = !this.isCommentInputVisible;
  }
  checkTextOverflow(): void {
    this.commentTextElements.forEach((element, index) => {
      const el = element.nativeElement;
      this.comments[index].isOverflowing = el.scrollWidth > el.clientWidth;
      console.log(this.comments[index].isOverflowing);
    });
  }
  addComment(): void {
    const dialogRef = this.dialog.open(AddInputCommentDialogComponent, {
      width: '1000px',
      data: { newCommentText: this.newCommentText }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resetExpandedStatus();
        setTimeout(() => this.checkTextOverflow(), 100);
        this.comments.push({ name: 'Tôi', text: result, isExpanded: false, isOverflowing: false });
      }
    });
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
  toggleComment(index: number): void {
    this.comments[index].isExpanded = !this.comments[index].isExpanded;
  }
  navigateBack(): void {
    this.router.navigate(['/']).then(() => {});
  }
}
