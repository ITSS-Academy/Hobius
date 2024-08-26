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
import { CardService } from '../../../services/card.service';
import { NgForOf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../ngrxs/auth/auth.actions';
import { Subscription } from 'rxjs';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { UserState } from '../../../ngrxs/user/user.state';

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

  constructor(
    private cardService: CardService,
    private store: Store<{ auth: AuthState; user: UserState }>,
  ) {}

  ngOnInit(): void {
    this.lichSuCards = this.cardService.cards;
    this.thinhHanhCards = this.cardService.cards;
    this.deCuCards = this.cardService.cards;
    this.bangXepHangCards = this.cardService.cards;
    this.subscriptions.push(
      this.store.select('auth', 'idToken').subscribe((value) => {
        console.log('idToken: ', value);
        this.idToken = value;
      }),
      this.store.select('auth', 'isStaticUser').subscribe((value) => {
        this.isStaticUser = value;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
