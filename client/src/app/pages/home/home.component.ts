import {
  AfterViewInit,
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  OnInit,
  inject,
  OnDestroy,
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, SharedModule, CardComponent, NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChildren('viewport') viewports!: QueryList<ElementRef>;
  lichSuCards: EbookModel[] = [];
  thinhHanhCards: EbookModel[] = [];
  deCuCards: EbookModel[] = [];
  bangXepHangCards: EbookModel[] = [];
  readonly dialog = inject(MatDialog);

  isStaticUser = false;
  userInfo: User | null = null;

  constructor(
    private cardService: CardService,
    private auth: Auth,
    private store: Store<{ auth: AuthState }>,
  ) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userInfo = user;
      } else {
        this.userInfo = null;
      }
    });
  }

  ngOnInit(): void {
    this.lichSuCards = this.cardService.cards;
    this.thinhHanhCards = this.cardService.cards;
    this.deCuCards = this.cardService.cards;
    this.bangXepHangCards = this.cardService.cards;
  }

  ngOnDestroy() {}

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
        slider.classList.add('active');
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
        applyInertia();
      });

      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
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

      const checkEndOfScroll = () => {
        if (
          slider.scrollLeft + slider.clientWidth >=
          slider.scrollWidth - safetyMargin
        ) {
          if (Math.abs(velocity) > minVelocityForBounce) {
            if (debounceTimeout) clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
              slider.classList.add('bounce-back');
              setTimeout(() => {
                slider.classList.remove('bounce-back');
              }, 500);
            }, 10);
          }
        } else if (slider.scrollLeft <= safetyMargin) {
          if (Math.abs(velocity) > minVelocityForBounce) {
            if (debounceTimeout) clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
              slider.classList.add('bounce-back-start');
              setTimeout(() => {
                slider.classList.remove('bounce-back-start');
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
        title: 'Logout',
        message: 'Are you sure you want to logout?',
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
    if (this.isStaticUser) {
      this.store.dispatch(AuthActions.signOut());
    } else {
      this.store.dispatch(AuthActions.signOut());
    }
  }
}
