import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import * as SearchActions from '../../../ngrxs/search/search.actions';
import { SearchState } from '../../../ngrxs/search/search.state';
import { Observable } from 'rxjs';
import { EbookModel } from '../../../models/ebook.model';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    AsyncPipe,
    NgForOf,
    NgIf,
    NgOptimizedImage,
  ],
})
export class SearchBarComponent {
  @Input() ebook!: EbookModel;
  showDropdown = false;
  searchResults$: Observable<EbookModel[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store<{ search: SearchState }>) {
    this.searchResults$ = this.store
      .select((state) => state.search.searchResults)
      .pipe(
        map((results) => results.slice(0, 4)), // Limit to 4 results
      );
    this.loading$ = this.store.select((state) => state.search.loading);
    this.error$ = this.store.select((state) => state.search.error);
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();
    this.showDropdown = query.length > 0;
    if (query.length > 0) {
      this.store.dispatch(SearchActions.search({ q: query }));
    }
  }

  getImageUrl(imageUrl: string): string {
    console.log('Image URL:', imageUrl);
    return imageUrl;
  }
}
