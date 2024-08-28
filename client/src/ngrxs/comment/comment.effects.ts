import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as CommentActions from './comment.actions';
import { CommentService } from '../../services/comment.service';

@Injectable()
export class CommentEffects {
  constructor(
    private actions$: Actions,
    private commentService: CommentService,
  ) {}

  findAllByEbookId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.findAllByEbookId),
      exhaustMap((action) => {
        return this.commentService.findAllByEbookId(action.ebookId).pipe(
          map((comments) => {
            return CommentActions.findAllByEbookIdSuccess({
              comments: comments,
            });
          }),
          catchError((error) => {
            return of(CommentActions.findAllByEbookIdError({ error: error }));
          }),
        );
      }),
    ),
  );

  findAllByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.findAllByUserId),
      exhaustMap(() => {
        return this.commentService.findAllByUserId().pipe(
          map((comments) => {
            return CommentActions.findAllByUserIdSuccess({
              comments: comments,
            });
          }),
          catchError((error) => {
            return of(CommentActions.findAllByUserIdError({ error: error }));
          }),
        );
      }),
    ),
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.create),
      exhaustMap((action) => {
        return this.commentService.create(action.comment).pipe(
          map(() => {
            return CommentActions.createSuccess();
          }),
          catchError((error) => {
            return of(CommentActions.createError({ error: error }));
          }),
        );
      }),
    ),
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.update),
      exhaustMap((action) => {
        return this.commentService.update(action.comment).pipe(
          map(() => {
            return CommentActions.updateSuccess();
          }),
          catchError((error) => {
            return of(CommentActions.updateError({ error: error }));
          }),
        );
      }),
    ),
  );

  findOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.findOne),
      exhaustMap((action) => {
        return this.commentService.findOne(action.ebookId).pipe(
          map((comment) => {
            return CommentActions.findOneSuccess({ comment: comment });
          }),
          catchError((error) => {
            return of(CommentActions.findOneError({ error: error }));
          }),
        );
      }),
    ),
  );
}
