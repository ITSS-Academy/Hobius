import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as SearchActions from './search.actions';
import { SearchService } from '../../services/search.service';

@Injectable()
export class SearchEffects {
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.search),
      exhaustMap((action) => {
        return this.searchService.searchEbooks(action.q).pipe(
          map((response) =>
            SearchActions.searchSuccess({
              searchResults: response,
            }),
          ),
          catchError((error) => {
            return of(SearchActions.searchFailure({ error: error }));
          }),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private searchService: SearchService,
  ) {}
}
