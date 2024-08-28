import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
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
import { JWTTokenService } from '../../../services/jwttoken.service';
import { CommentDetailComponent } from './components/comment-detail/comment-detail.component';
import * as UserEbookActions from '../../../ngrxs/user-ebook/user-ebook.actions';

@Component({
  selector: 'app-ebook-info',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './ebook-info.component.html',
  styleUrls: ['./ebook-info.component.scss'],
})
export class EbookInfoComponent implements OnInit, OnDestroy {
  ebookId = '';
  comments: CommentModel[] = [];
  userComment: CommentModel | null = null;
  isAlreadyCommented: boolean = false;
  isLogin: boolean = false;

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
    private activatedRoute: ActivatedRoute,
    private jwtTokenService: JWTTokenService,
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
          this.store.dispatch(
            UserEbookActions.findOneByEbookIdAndUserId({ ebookId: id }),
          );
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      }),
      this.store.select('comment', 'ebookCommentList').subscribe((comments) => {
        if (comments.length > 0) {
          this.comments = comments;
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
      this.store
        .select('comment', 'isUpdatingCommentSuccess')
        .subscribe((val) => {
          if (val) {
            this._snackBar.open('Chỉnh sửa đánh giá thành công', 'Đóng', {
              duration: 2000,
            });
            this.store.dispatch(
              CommentActions.findOne({ ebookId: this.ebookId }),
            );
          }
        }),
      this.store
        .select('comment', 'isUpdatingCommentError')
        .subscribe((val) => {
          if (val) {
            this._snackBar.open('Chỉnh sửa đánh giá thất bại', 'Đóng', {
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
      this.store.select('user_ebook', 'currentReading').subscribe((val) => {
        if (val) {
          this.isFavorite = val.isLiked;
        }
      }),
      this.store.select('ebook', 'isLikingEbookSuccess').subscribe((val) => {
        if (val) {
          this._snackBar.open('Đã thêm vào yêu thích', 'Đóng', {
            duration: 2000,
          });
          this.store.dispatch(
            UserEbookActions.findOneByEbookIdAndUserId({
              ebookId: this.ebookId,
            }),
          );
        }
      }),
      this.store.select('ebook', 'isLikingEbookError').subscribe((val) => {
        if (val) {
          this._snackBar.open('Thêm vào yêu thích thất bại', 'Đóng', {
            duration: 2000,
          });
        }
      }),
      this.store.select('ebook', 'isUnlikingEbookSuccess').subscribe((val) => {
        if (val) {
          this._snackBar.open('Đã xóa khỏi yêu thích', 'Đóng', {
            duration: 2000,
          });
          this.store.dispatch(
            UserEbookActions.findOneByEbookIdAndUserId({
              ebookId: this.ebookId,
            }),
          );
        }
      }),
      this.store.select('ebook', 'isUnlikingEbookError').subscribe((val) => {
        if (val) {
          this._snackBar.open('Xóa khỏi yêu thích thất bại', 'Đóng', {
            duration: 2000,
          });
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.store.dispatch(EbookActions.reset());
  }

  openCommentFormDialog(): void {
    this.jwtTokenService.checkTokenExpired();
    if (this.jwtTokenService.isTokenExpired()) {
      return;
    }

    const dialogRef = this.dialog.open(AddInputCommentDialogComponent, {
      data: this.userComment,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
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
      }
    });
  }

  openCommentDetailDialog(comment: CommentModel) {
    const dialogRef = this.dialog.open(CommentDetailComponent, {
      data: comment,
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.store.dispatch(EbookActions.unlike({ id: this.ebookId }));
    } else {
      this.store.dispatch(EbookActions.like({ id: this.ebookId }));
    }
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

  read() {
    this.router.navigate(['/reading', this.ebookId]).then(() => {
      this.store.dispatch(EbookActions.view({ id: this.ebookId }));
    });
  }
}
