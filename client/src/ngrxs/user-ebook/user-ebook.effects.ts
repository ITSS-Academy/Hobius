import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as UserEbookActions from './user-ebook.actions';
import { UserEbookService } from '../../services/user-ebook.service';
import { UserEbookModel } from '../../models/user-ebook.model';

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
            //count the number of likes and views

            //count the likeQuantity base on the isLiked field
            const likeQuantity = response.filter(
              (item: UserEbookModel) => item.isLiked,
            ).length;

            const favoriteEbookList = response.filter(
              (item: UserEbookModel) => item.isLiked,
            );
            // console.log(favoriteEbookList);

            return UserEbookActions.findAllByUserIdSuccess({
              userEbooks: response,
              favoriteEbookList: favoriteEbookList,
              viewQuantity: response.length,
              likeQuantity: likeQuantity,
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
