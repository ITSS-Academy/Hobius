import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { CardComponent } from '../../components/card/card.component';
import { EbookModel } from '../../../models/ebook.model';
import { NgForOf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Store } from '@ngrx/store';
import { CategoryState } from '../../../ngrxs/category/category.state';
import { combineLatest, Subscription } from 'rxjs';
import { CategoryModel } from '../../../models/category.model';
import * as EbookActions from '../../../ngrxs/ebook/ebook.actions';
import { EbookState } from '../../../ngrxs/ebook/ebook.state';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import { MatChipSelectionChange } from '@angular/material/chips';
import * as UserEbookActions from '../../../ngrxs/user-ebook/user-ebook.actions';
import { UserEbookState } from '../../../ngrxs/user-ebook/user-ebook.state';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    CardComponent,
    NgForOf,
    SearchBarComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('viewport') viewports!: QueryList<ElementRef>;
  @ViewChildren('theLoai') theLoaiElements!: QueryList<ElementRef>;

  theLoai: CategoryModel[] = [];
  cardsBar: EbookModel[] = [];
  filterEbooks: EbookModel[] = [];
  selectedChip: CategoryModel[] = [];

  headerName: string = '';
  subscriptions: Subscription[] = [];

  idToken$ = this.store.select('auth', 'idToken');
  params$ = this.activatedRoute.paramMap;

  isLoadingTrendingEbooks$ = this.store.select(
    'ebook',
    'isLoadingTrendingEbooks',
  );
  isLoadingRatingEbooks$ = this.store.select('ebook', 'isLoadingRatingEbooks');
  isLoadingRecommendEbooks$ = this.store.select(
    'ebook',
    'isLoadingRecommendEbooks',
  );
  isLoadingReadingHistoryList$ = this.store.select(
    'user_ebook',
    'isLoadingReadingHistoryList',
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      category: CategoryState;
      auth: AuthState;
      ebook: EbookState;
      user_ebook: UserEbookState;
    }>,
    private renderer: Renderer2,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([this.idToken$, this.params$]).subscribe(
        ([idToken, params]) => {
          const type = params.get('type');
          if (type) {
            switch (type) {
              case 'history':
                this.headerName = 'Lịch sử';
                if (idToken != '') {
                  this.store.dispatch(UserEbookActions.findAllByUserId());
                }
                break;
              case 'trends':
                this.headerName = 'Thịnh hành';
                this.store.dispatch(EbookActions.listByTrend({ limit: 100 }));
                break;
              case 'recommend':
                this.headerName = 'Đề cử';
                this.store.dispatch(
                  EbookActions.listByRecommend({ limit: 100 }),
                );

                break;
              case 'rank':
                this.headerName = 'Bảng xếp hạng';
                this.store.dispatch(EbookActions.listByRating({ limit: 100 }));
                break;
            }
          }
        },
      ),
      this.store.select('ebook', 'recommendEbooks').subscribe((ebooks) => {
        this.cardsBar = ebooks;
      }),
      this.store.select('ebook', 'trendingEbooks').subscribe((ebooks) => {
        this.cardsBar = ebooks;
      }),
      this.store.select('ebook', 'ratingEbooks').subscribe((ebooks) => {
        this.cardsBar = ebooks;
      }),
      this.store
        .select('user_ebook', 'readingHistoryList')
        .subscribe((userEbooks) => {
          if (userEbooks.length > 0) {
            this.cardsBar = userEbooks.map((userEbook) => {
              return userEbook.ebook;
            });
          }
        }),
      this.store.select('category', 'categories').subscribe((categories) => {
        if (categories.length > 0) {
          this.theLoai = categories;
        }
      }),
    );
  }

  ngAfterViewInit() {
    this.addViewportListeners();
    this.addTheLoaiListeners();
  }

  addViewportListeners() {
    this.viewports.forEach((viewport) => {
      const slider = viewport.nativeElement as HTMLElement;
      let isDown = false;
      let startX: number;
      let scrollLeft: number;
      let velocity = 0;
      let lastMoveTime: number;
      let lastMoveX: number;

      // Mouse Events
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
      });

      // Touch Events
      slider.addEventListener('touchstart', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        lastMoveTime = Date.now();
        lastMoveX = e.touches[0].pageX;
      });

      slider.addEventListener('touchend', () => {
        isDown = false;
        slider.classList.remove('active');
        applyInertia();
      });

      slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.1; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;

        const now = Date.now();
        const deltaTime = now - lastMoveTime;
        const deltaX = e.touches[0].pageX - lastMoveX;
        velocity = deltaX / deltaTime;

        lastMoveTime = now;
        lastMoveX = e.touches[0].pageX;
      });

      function applyInertia() {
        const friction = 0.95;
        const step = () => {
          if (Math.abs(velocity) < 0.1) return;
          slider.scrollLeft -= velocity * 5;
          velocity *= friction;
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
  }

  addTheLoaiListeners() {
    this.theLoaiElements.forEach((elementRef) => {
      const element = elementRef.nativeElement as HTMLElement;
      element.addEventListener('click', () => {
        if (element.classList.contains('selected')) {
          this.renderer.removeClass(element, 'selected');
        } else {
          this.renderer.addClass(element, 'selected');
        }
      });
    });
  }

  filterList(index: number) {
    //check if the selectedChip already have the genre
    const genre = this.theLoai[index];
    const foundIndex = this.selectedChip.findIndex((chip) => {
      return chip.id === genre.id;
    });
    if (foundIndex !== -1) {
      this.selectedChip.splice(foundIndex, 1);
    } else {
      this.selectedChip.push(genre);
    }

    //the filterEbooks will add the ebooks that have one of the selected genres
    this.filterEbooks = this.cardsBar.filter((ebook) => {
      return ebook.categories.some((category) => {
        return this.selectedChip.some((selected) => {
          return category.id === selected.id;
        });
      });
    });
    // console.log(this.filterEbooks);
  }
}
