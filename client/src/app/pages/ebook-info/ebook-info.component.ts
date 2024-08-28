import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddInputCommentDialogComponent } from './components/add-input-comment-dialog/add-input-comment-dialog.component';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { EbookModel } from '../../../models/ebook.model';
import { CardService } from '../../../services/card.service';
import { CommentModel } from '../../../models/comment.model';
import * as EbookActions from '../../../ngrxs/ebook/ebook.actions';
import { EbookState } from '../../../ngrxs/ebook/ebook.state';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import { UserState } from '../../../ngrxs/user/user.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ebook-info',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './ebook-info.component.html',
  styleUrls: ['./ebook-info.component.scss'],
})
export class EbookInfoComponent implements AfterViewInit, OnInit {
  @ViewChildren('commentText') commentTextElements!: QueryList<ElementRef>;
  isCommentInputVisible: boolean = false;
  newCommentText: string = '';
  idToken: string = '';
  comments: CommentModel[] = [
    {
      user: {
        id: '1',
        userName: 'Nguyễn Văn A',
        email: 'nguyenvana@gmail.com',
        avatarURL: '',
        wallPaperURL: '',
        joinedDate: '',
      },
      content:
        'Godamn, tôi chưa bao giờ đọc được quấn sách nào hay như vậy, các nhân này mà có ở ngoài đời thật thì sẽ thú vị như thế nào',
      isExpanded: false,
      isOverflowing: false,
      ebook: {
        id: '',
        title: '',
        author: '',
        detail: '',
        image: '',
        publishedDate: '',
        view: 0,
        like: 0,
        pdf: '',
        categories: [],
      },
      commentDate: '',
    },
    {
      user: {
        id: '2',
        userName: 'Nguyen Van C',
        email: 'nguyenvanc@gmail.com',
        avatarURL: '',
        wallPaperURL: '',
        joinedDate: '',
      },
      content:
        'Xương rồng đơm lá, đơm hoa Nước ngọt đong đầy trên cao nguyên đá\n' +
        '              Là ngày Hoàng đế về nhà Bảy năm mòn mỏi, kiệu hoa đón ngài Vương\n' +
        '              triều màu Đỏ mất ngai Bao năm chờ đợi, mong ngày phục hưng Cuối\n' +
        '              cùng trời đã đông hừng Đế chế trở lại, chúc mừng Quỷ Vương!',
      isExpanded: false,
      isOverflowing: false,
      ebook: {
        id: '',
        title: '',
        author: '',
        detail: '',
        image: '',
        publishedDate: '',
        view: 0,
        like: 0,
        pdf: '',
        categories: [],
      },
      commentDate: '',
    },
  ];
  isFavorite: boolean = false;
  isHovering: boolean = false;
  subscriptions: Subscription[] = [];

  selectedEbook$ = this.store.select('ebook', 'selectedEbook');
  isLoadingSelectedEbook$ = this.store.select(
    'ebook',
    'isLoadingSelectedEbook',
  );

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      auth: AuthState;
      user: UserState;
      ebook: EbookState;
    }>,
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.store.dispatch(EbookActions.findOne({ id }));
    console.log('id: ', id);
    this.subscriptions.push();
  }

  ngAfterViewInit(): void {
    this.checkTextOverflow();
    this.cd.detectChanges();
  }

  resetExpandedStatus(): void {
    this.comments.forEach((comment) => (comment.isExpanded = false));
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
      data: { newCommentText: this.newCommentText },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.resetExpandedStatus();
        setTimeout(() => this.checkTextOverflow(), 100);
        this.comments.push({
          ebook: {
            id: '',
            title: '',
            author: '',
            detail: '',
            image: '',
            publishedDate: '',
            view: 0,
            like: 0,
            pdf: '',
            categories: [],
          },
          user: {
            id: '3',
            userName: 'Nguyen Van D',
            email: '',
            avatarURL: '',
            wallPaperURL: '',
            joinedDate: '',
          },
          content: result as string,
          isExpanded: false,
          isOverflowing: false,
          commentDate: new Date().toLocaleString(),
        });
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
