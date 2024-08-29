import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditProfileFormDialogComponent } from './components/edit-profile-form-dialog/edit-profile-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from '../../../models/user.model';
import { NgStyle } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserState } from '../../../ngrxs/user/user.state';
import { Subscription } from 'rxjs';
import * as UserActions from '../../../ngrxs/user/user.actions';
import { JWTTokenService } from '../../../services/jwttoken.service';
import { Router } from '@angular/router';
import { CommentModel } from '../../../models/comment.model';
import { UserEbookState } from '../../../ngrxs/user-ebook/user-ebook.state';
import { UserEbookModel } from '../../../models/user-ebook.model';
import * as CommentActions from '../../../ngrxs/comment/comment.actions';
import { CommentState } from '../../../ngrxs/comment/comment.state';
import * as EbookActions from '../../../ngrxs/ebook/ebook.actions';
import { EbookState } from '../../../ngrxs/ebook/ebook.state';
import * as UserEbookActions from '../../../ngrxs/user-ebook/user-ebook.actions';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MaterialModule, SharedModule, NgStyle],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements AfterViewInit, OnInit, OnDestroy {
  user$ = this.store.select('user', 'user');
  user: UserModel | null = null;

  likeQuantity = 0;
  viewQuantity = 0;

  isUpdating$ = this.store.select('user', 'isUpdating');
  isGetting$ = this.store.select('user', 'isGetting');

  @ViewChild('myBackground') background?: ElementRef;

  bookCard: UserEbookModel[] = [];
  tempIndex = 0;

  cmtCard: CommentModel[] = [];

  subscription: Subscription[] = [];

  findAllByUserId$ = this.store.select('comment', 'isFindingAllByUserId');

  constructor(
    private _snackBar: MatSnackBar,
    private store: Store<{
      user: UserState;
      user_ebook: UserEbookState;
      comment: CommentState;
      ebook: EbookState;
    }>,
    private jwtTokenService: JWTTokenService,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(UserActions.reset());
  }

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('user', 'user').subscribe((value) => {
        if (value) {
          this.store.dispatch(
            CommentActions.findAllByUserId({ userId: value.id }),
          );
          this.store.dispatch(UserEbookActions.findAllByUserId());
        }
        this.user = value;
      }),
      this.store.select('user', 'isUpdatingSuccess').subscribe((value) => {
        if (value) {
          this._snackBar.open('Cập nhật hồ sơ thành công', 'Đóng', {
            duration: 2000,
          });
          this.store.dispatch(UserActions.getById());
        }
      }),
      this.store.select('user', 'isUpdatingError').subscribe((value) => {
        if (value) {
          this._snackBar.open('Cập nhật hồ sơ thất bại', 'Đóng', {
            duration: 2000,
          });
        }
      }),
      this.store.select('user', 'isGettingError').subscribe((value) => {
        if (value) {
          this._snackBar.open('Không thể lấy thông tin người dùng', 'Đóng', {
            duration: 2000,
          });
        }
      }),
      this.store.select('user_ebook', 'likeQuantity').subscribe((value) => {
        this.likeQuantity = value;
      }),
      this.store.select('user_ebook', 'viewQuantity').subscribe((value) => {
        this.viewQuantity = value;
      }),
      this.store
        .select('user_ebook', 'favoriteEbookList')
        .subscribe((value) => {
          this.bookCard = [...value];
        }),
      this.store.select('comment', 'userCommentList').subscribe((value) => {
        this.cmtCard = [...value];
      }),
      this.store
        .select('ebook', 'isUnlikingEbookSuccess')
        .subscribe((value) => {
          if (value) {
            this.bookCard.splice(this.tempIndex, 1);
            this._snackBar.open('Đã bỏ theo dõi', 'Đóng', {
              duration: 2000,
            });
          }
        }),
      this.store.select('ebook', 'isUnlikingEbookError').subscribe((value) => {
        if (value) {
          this._snackBar.open('Bỏ theo dõi thất bại', 'Đóng', {
            duration: 2000,
          });
        }
      }),
    );
  }

  ngAfterViewInit() {
    this.subscription.push(
      this.user$.subscribe((value) => {
        if (value) {
          if (this.background) {
            this.background.nativeElement.style.backgroundImage = `url(${value.wallPaperURL})`;
            this.user = value;
          }
        }
      }),
    );
  }

  removeBookCard(index: number) {
    this.tempIndex = index;
    this.store.dispatch(
      EbookActions.unlike({ id: this.bookCard[index].ebook.id }),
    );
  }

  readonly dialog = inject(MatDialog);

  openProfileDialog(): void {
    this.jwtTokenService.checkTokenExpired();
    if (this.jwtTokenService.isTokenExpired()) {
      this.router.navigate(['/']).then(() => {});
      return;
    }
    const dialogRef = this.dialog.open(EditProfileFormDialogComponent, {
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.store.dispatch(UserActions.update({ user: result }));
      }
    });
  }
}
