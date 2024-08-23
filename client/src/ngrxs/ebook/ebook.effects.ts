import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as EbookActions from './ebook.actions';
import { EbookService } from '../../services/ebook.service';

@Injectable()
export class EbookEffects {
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EbookActions.create),
      exhaustMap((action) => {
        return this.ebookService.create(action.ebook).pipe(
          map(() => {
            return EbookActions.createSuccess();
          }),
          catchError((error) => {
            return of(EbookActions.createError({ error: error }));
          }),
        );
      }),
    ),
  );

  findAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EbookActions.findAll),
      exhaustMap(() => {
        return this.ebookService.findAll().pipe(
          map((response) => {
            return EbookActions.findAllSuccess({ ebooks: response });
          }),
          catchError((error) => {
            return of(EbookActions.findAllError({ error: error }));
          }),
        );
      }),
    ),
  );

  listByTrend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EbookActions.listByTrend),
      exhaustMap((action) => {
        return this.ebookService.listByTrend(action.limit).pipe(
          map((response) => {
            return EbookActions.listByTrendSuccess({ ebooks: response });
          }),
          catchError((error) => {
            return of(EbookActions.listByTrendError({ error: error }));
          }),
        );
      }),
    ),
  );

  listByRecommend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EbookActions.listByRecommend),
      exhaustMap((action) => {
        return this.ebookService.listByRecommend(action.limit).pipe(
          map((response) => {
            return EbookActions.listByRecommendSuccess({ ebooks: response });
          }),
          catchError((error) => {
            return of(EbookActions.listByRecommendError({ error: error }));
          }),
        );
      }),
    ),
  );

  listByRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EbookActions.listByRating),
      exhaustMap((action) => {
        return this.ebookService.listByRating(action.limit).pipe(
          map((response) => {
            return EbookActions.listByRatingSuccess({ ebooks: response });
          }),
          catchError((error) => {
            return of(EbookActions.listByRatingError({ error: error }));
          }),
        );
      }),
    ),
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EbookActions.update),
      exhaustMap((action) => {
        return this.ebookService.update(action.id, action.ebook).pipe(
          map(() => {
            return EbookActions.updateSuccess();
          }),
          catchError((error) => {
            return of(EbookActions.updateError({ error: error }));
          }),
        );
      }),
    ),
  );

  findOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EbookActions.findOne),
      exhaustMap((action) => {
        return this.ebookService.findOne(action.id).pipe(
          map((response) => {
            return EbookActions.findOneSuccess({ ebook: response });
          }),
          catchError((error) => {
            return of(EbookActions.findOneError({ error: error }));
          }),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private ebookService: EbookService,
  ) {}
}
