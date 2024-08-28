import {
  AfterViewInit,
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  OnInit,
  inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { CardComponent } from '../../components/card/card.component';
import { EbookModel } from '../../../models/ebook.model';
import { NgForOf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../ngrxs/auth/auth.actions';
import { Subscription } from 'rxjs';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { UserState } from '../../../ngrxs/user/user.state';
import * as EbookActions from '../../../ngrxs/ebook/ebook.actions';
import { EbookState } from '../../../ngrxs/ebook/ebook.state';
import * as UserEbookActions from '../../../ngrxs/user-ebook/user-ebook.actions';
import { UserEbookState } from '../../../ngrxs/user-ebook/user-ebook.state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    CardComponent,
    NgForOf,
    SearchBarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  @ViewChildren('viewport') viewports!: QueryList<ElementRef>;
  @ViewChild('viewport') viewport!: ElementRef;
  isDragging = false;
  lichSuCards: EbookModel[] = [];
  thinhHanhCards: EbookModel[] = [];
  deCuCards: EbookModel[] = [];
  bangXepHangCards: EbookModel[] = [];
  readonly dialog = inject(MatDialog);

  isStaticUser = false;
  idToken: string = '';
  user$ = this.store.select('user', 'user');

  isLoadingReadingHistoryList$ = this.store.select(
    'user_ebook',
    'isLoadingReadingHistoryList',
  );
  isLoadingTrendingEbooks$ = this.store.select(
    'ebook',
    'isLoadingTrendingEbooks',
  );
  isLoadingRecommendEbooks$ = this.store.select(
    'ebook',
    'isLoadingRecommendEbooks',
  );
  isLoadingRatingEbooks$ = this.store.select('ebook', 'isLoadingRatingEbooks');

  constructor(
    private store: Store<{
      auth: AuthState;
      user: UserState;
      ebook: EbookState;
      user_ebook: UserEbookState;
    }>,
  ) {}

  ngOnInit(): void {
    // Select trendingEbooks, recommendEbooks, and ratingEbooks from the store
    this.subscriptions.push(
      this.store.select('auth', 'idToken').subscribe((value) => {
        console.log('idToken: ', value);
        this.idToken = value;
        if (this.idToken != '') {
          this.store.dispatch(UserEbookActions.findAllByUserId());
        }
      }),
      this.store.select('auth', 'isStaticUser').subscribe((value) => {
        this.isStaticUser = value;
      }),
      this.store.select('ebook', 'trendingEbooks').subscribe((ebooks) => {
        console.log('trendingEbooks: ', ebooks);
        this.thinhHanhCards = ebooks;
      }),
      this.store.select('ebook', 'recommendEbooks').subscribe((ebooks) => {
        this.deCuCards = ebooks;
      }),
      this.store.select('ebook', 'ratingEbooks').subscribe((ebooks) => {
        this.bangXepHangCards = ebooks;
      }),
      this.store
        .select('user_ebook', 'readingHistoryList')
        .subscribe((ebooks) => {
          if (ebooks && ebooks.length > 0) {
            this.lichSuCards = ebooks.map((ebook) => ebook.ebook);
          } else {
            this.lichSuCards = [];
          }
        }),
    );

    // Dispatch actions to load the ebooks
    this.store.dispatch(EbookActions.listByTrend({ limit: 10 }));
    this.store.dispatch(EbookActions.listByRecommend({ limit: 10 }));
    this.store.dispatch(EbookActions.listByRating({ limit: 10 }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(UserEbookActions.reset());
    this.store.dispatch(EbookActions.reset());
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
      const safetyMargin = 100; // Safety margin before bounce-back
      const minVelocityForBounce = 0.8; // Minimum velocity to trigger bounce-back
      let debounceTimeout: any;

      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        this.isDragging = false;
        slider.classList.add('clicking');
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
        setTimeout(() => {
          this.isDragging = false;
        }, 0);
        applyInertia();
      });

      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        this.isDragging = true;
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.1; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;

        const now = Date.now();
        const deltaTime = now - lastMoveTime;
        const deltaX = e.pageX - lastMoveX;
        velocity = deltaX / deltaTime;

        lastMoveTime = now;
        lastMoveX = e.pageX;

        checkEndOfScroll();
      });

      function applyInertia() {
        const friction = 0.95;
        const step = () => {
          if (Math.abs(velocity) < 0.1) return;
          slider.scrollLeft -= velocity * 5;
          velocity *= friction;
          requestAnimationFrame(step);
          checkEndOfScroll();
        };
        requestAnimationFrame(step);
      }

      let isBouncingBack = false;

      const checkEndOfScroll = () => {
        if (isBouncingBack) return;

        if (
          slider.scrollLeft + slider.clientWidth >=
          slider.scrollWidth - safetyMargin
        ) {
          if (Math.abs(velocity) > minVelocityForBounce) {
            if (debounceTimeout) clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
              isBouncingBack = true;
              slider.classList.add('bounce-back');
              setTimeout(() => {
                slider.classList.remove('bounce-back');
                isBouncingBack = false;
              }, 500);
            }, 10);
          }
        } else if (slider.scrollLeft <= safetyMargin) {
          if (Math.abs(velocity) > minVelocityForBounce) {
            if (debounceTimeout) clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
              isBouncingBack = true;
              slider.classList.add('bounce-back-start');
              setTimeout(() => {
                slider.classList.remove('bounce-back-start');
                isBouncingBack = false;
              }, 500);
            }, 10);
          }
        }
      };
    });
  }

  openConfirmLogoutDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Đăng xuất',
        message: 'Bạn có chắc chắn muốn đăng xuất?',
      },
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result == true) {
        console.log('User confirmed logout');
        this.logout();
      }
    });
  }

  logout() {
    this.store.dispatch(AuthActions.signOut());
  }
}
