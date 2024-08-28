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

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.create),
      exhaustMap((action) => {
        return this.commentService.createComment(action.comment).pipe(
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
  updateComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.updateComment),
      exhaustMap((action) => {
        return this.commentService.updateComment(action.comment).pipe(
          map(() => {
            return CommentActions.updateCommentSuccess();
          }),
          catchError((error) => {
            return of(CommentActions.updateCommentError({ error: error }));
          }),
        );
      }),
    ),
  );
  findAllEbookId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.findAllEbookId),
      exhaustMap((action) => {
        return this.commentService.findAllEbookId(action.ebookId).pipe(
          map((response) => {
            return CommentActions.findAllEbookIdSuccess({ comments: response });
          }),
          catchError((error) => {
            return of(CommentActions.findAllEbookIdError({ error: error }));
          }),
        );
      }),
    ),
  );
  findAllUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.findAllUserId),
      exhaustMap((action) => {
        return this.commentService.findAllUserId(action.userId).pipe(
          map((response) => {
            return CommentActions.findAllUserIdSuccess({ comments: response });
          }),
          catchError((error) => {
            return of(CommentActions.findAllUserIdError({ error: error }));
          }),
        );
      }),
    ),
  );
  findOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.findOne),
      exhaustMap((action) => {
        return this.commentService
          .findOneComment(action.useId, action.ebookId)
          .pipe(
            map((response) => {
              return CommentActions.findOneSuccess({ comment: response });
            }),
            catchError((error) => {
              return of(CommentActions.findOneError({ error: error }));
            }),
          );
      }),
    ),
  );
}
