import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import * as SearchActions from '../../../ngrxs/search/search.actions';
import { SearchState } from '../../../ngrxs/search/search.state';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { EbookModel } from '../../../models/ebook.model';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [NgForOf, NgIf, NgOptimizedImage, MaterialModule, SharedModule],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() ebook!: EbookModel;
  showDropdown = false;

  subscription: Subscription[] = [];

  searchControl = new FormControl();

  searchResults$ = this.store
    .select((state) => state.search.searchResults)
    .pipe(
      map((results) => results.slice(0, 4)), // Limit to 4 results
    );
  loading$ = this.store.select((state) => state.search.loading);
  error$ = this.store.select((state) => state.search.error);

  constructor(
    private router: Router,
    private store: Store<{ search: SearchState }>,
  ) {
    this.searchControl.valueChanges
      .pipe(takeUntilDestroyed())
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        this.store.dispatch(SearchActions.search({ q: value }));
      });
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();
    this.showDropdown = query.length > 0;
    // if (query.length > 0) {
    //   this.store.dispatch(SearchActions.search({ q: query }));
    // }
  }

  getImageUrl(imageUrl: string): string {
    // console.log('Image URL:', imageUrl);
    return imageUrl;
  }

  onResultClick(result: EbookModel): void {
    this.router.navigate(['/ebook-info', result.id]).then();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    this.subscription.push();
    this.updateDropdownWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateDropdownWidth();
  }

  updateDropdownWidth() {
    const searchHeader = document.getElementById('search-header');
    const dropdownBox = document.getElementById('dropdownBox');
    if (searchHeader && dropdownBox) {
      dropdownBox.style.width = `${searchHeader.offsetWidth}px`;
    }
  }
}
