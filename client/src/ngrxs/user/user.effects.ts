import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Injectable()
export class UserEffects {
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.create),
      exhaustMap(() => {
        return this.userService.create().pipe(
          map(() => {
            return UserActions.createSuccess();
          }),
          catchError((error) => {
            return of(UserActions.createFailure({ error: error }));
          }),
        );
      }),
    ),
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.update),
      exhaustMap((action) => {
        return this.userService.update(action.user).pipe(
          map(() => UserActions.updateSuccess()),
          catchError((error) => {
            return of(UserActions.updateFailure({ error: error }));
          }),
        );
      }),
    ),
  );

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getById),
      exhaustMap(() => {
        return this.userService.getById().pipe(
          map((response) =>
            UserActions.getByIdSuccess({
              user: response as UserModel,
            }),
          ),
          catchError((obj) => {
            // console.log(obj);
            return of(UserActions.getByIdFailure({ error: obj.error.message }));
          }),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}
}
