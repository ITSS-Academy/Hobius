import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as UserEbookActions from './user-ebook.actions';
import { UserEbookService } from '../../services/user-ebook.service';

@Injectable()
export class UserEbookEffects {
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserEbookActions.create),
      exhaustMap((action) => {
        return this.userEbookService.create(action.userEbook).pipe(
          map(() => {
            return UserEbookActions.createSuccess();
          }),
          catchError((error) => {
            return of(UserEbookActions.createError({ error: error }));
          }),
        );
      }),
    ),
  );

  findAllByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserEbookActions.findAllByUserId),
      exhaustMap(() => {
        return this.userEbookService.findAllByUserId().pipe(
          map((response) => {
            return UserEbookActions.findAllByUserIdSuccess({
              userEbooks: response,
            });
          }),
          catchError((error) => {
            return of(UserEbookActions.findAllByUserIdError({ error: error }));
          }),
        );
      }),
    ),
  );

  findOneByEbookIdAndUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserEbookActions.findOneByEbookIdAndUserId),
      exhaustMap((action) => {
        return this.userEbookService
          .findOneByEbookIdAndUserId(action.ebookId)
          .pipe(
            map((response) => {
              return UserEbookActions.findOneByEbookIdAndUserIdSuccess({
                userEbook: response,
              });
            }),
            catchError((error) => {
              return of(
                UserEbookActions.findOneByEbookIdAndUserIdError({
                  error: error,
                }),
              );
            }),
          );
      }),
    ),
  );

  read$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserEbookActions.read),
      exhaustMap((action) => {
        return this.userEbookService
          .read(action.ebookId, action.userEbook)
          .pipe(
            map(() => {
              return UserEbookActions.readSuccess();
            }),
            catchError((error) => {
              return of(UserEbookActions.readError({ error: error }));
            }),
          );
      }),
    ),
  );

  finishReading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserEbookActions.finishReading),
      exhaustMap((action) => {
        return this.userEbookService
          .finishReading(action.ebookId, action.userEbook)
          .pipe(
            map(() => {
              return UserEbookActions.finishReadingSuccess();
            }),
            catchError((error) => {
              return of(UserEbookActions.finishReadingError({ error: error }));
            }),
          );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private userEbookService: UserEbookService,
  ) {}
}
