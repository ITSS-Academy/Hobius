import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddInputCommentDialogComponent } from './components/add-input-comment-dialog/add-input-comment-dialog.component';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { CommentModel } from '../../../models/comment.model';
import * as EbookActions from '../../../ngrxs/ebook/ebook.actions';
import { EbookState } from '../../../ngrxs/ebook/ebook.state';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import { UserState } from '../../../ngrxs/user/user.state';
import { Subscription } from 'rxjs';
import { UserEbookState } from '../../../ngrxs/user-ebook/user-ebook.state';
import { CommentState } from '../../../ngrxs/comment/comment.state';
import * as CommentActions from '../../../ngrxs/comment/comment.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ebook-info',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './ebook-info.component.html',
  styleUrls: ['./ebook-info.component.scss'],
})
export class EbookInfoComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChildren('commentText') commentTextElements!: QueryList<ElementRef>;
  isCommentInputVisible: boolean = false;

  ebookId = '';
  comments: CommentModel[] = [];
  userComment: CommentModel | null = null;
  isAlreadyCommented: boolean = false;

  isFavorite: boolean = false;
  isHovering: boolean = false;

  subscriptions: Subscription[] = [];

  selectedEbook$ = this.store.select('ebook', 'selectedEbook');
  isLoadingSelectedEbook$ = this.store.select(
    'ebook',
    'isLoadingSelectedEbook',
  );

  isFindingAllByEbookId$ = this.store.select(
    'comment',
    'isFindingAllByEbookId',
  );

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      auth: AuthState;
      user: UserState;
      ebook: EbookState;
      user_ebook: UserEbookState;
      comment: CommentState;
    }>,
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.ebookId = id;
    this.store.dispatch(EbookActions.findOne({ id }));
    this.store.dispatch(CommentActions.findAllByEbookId({ ebookId: id }));

    this.subscriptions.push(
      this.store.select('auth', 'idToken').subscribe((idToken) => {
        if (idToken != '') {
          this.store.dispatch(CommentActions.findOne({ ebookId: id }));
        }
      }),
      this.store.select('comment', 'ebookCommentList').subscribe((comments) => {
        if (comments.length > 0) {
          this.comments = comments;
          this.checkTextOverflow();
        }
      }),
      this.store
        .select('comment', 'isCreatingCommentSuccess')
        .subscribe((val) => {
          if (val) {
            this._snackBar.open('Đánh giá thành công', 'Đóng', {
              duration: 2000,
            });
            this.store.dispatch(
              CommentActions.findAllByEbookId({ ebookId: this.ebookId }),
            );
          }
        }),
      this.store
        .select('comment', 'isCreatingCommentError')
        .subscribe((val) => {
          if (val) {
            this._snackBar.open('Đánh giá thất bại', 'Đóng', {
              duration: 2000,
            });
          }
        }),
      this.store.select('comment', 'selectedComment').subscribe((comment) => {
        if (comment) {
          this.isAlreadyCommented = true;
          this.userComment = comment;
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.store.dispatch(EbookActions.reset());
  }

  ngAfterViewInit(): void {
    this.checkTextOverflow();
    this.cd.detectChanges();
  }

  resetExpandedStatus(): void {
    // Reset all comments to be collapsed
    this.comments = this.comments.map((comment) => {
      return {
        ...comment,
        isExpanded: false,
      };
    });
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

  openCommentDialog(): void {
    this.toggleCommentInput();
    const dialogRef = this.dialog.open(AddInputCommentDialogComponent, {
      data: this.userComment,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.resetExpandedStatus();
        setTimeout(() => {
          this.checkTextOverflow();
          let newComment: CommentModel = {
            ...result,
            ebook: this.ebookId,
          };
          console.log(newComment);
          if (this.isAlreadyCommented) {
            this.store.dispatch(CommentActions.update({ comment: newComment }));
          } else {
            this.store.dispatch(CommentActions.create({ comment: newComment }));
          }
        }, 100);
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

  read() {
    this.router.navigate(['/reading', this.ebookId]).then(() => {
      this.store.dispatch(EbookActions.view({ id: this.ebookId }));
    });
  }
}
