import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as CategoryActions from './category.actions';
import { CategoryService } from '../../services/category.service';

@Injectable()
export class CategoryEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getAll),
      exhaustMap(() => {
        return this.categoryService.getAll().pipe(
          map((response) =>
            CategoryActions.getAllSuccess({
              categories: response,
            }),
          ),
          catchError((error) => {
            return of(CategoryActions.getAllFailure({ error: error }));
          }),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
  ) {}
}
