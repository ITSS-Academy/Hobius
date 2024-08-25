import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
  signInWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInWithGoogle),
      exhaustMap(() => {
        return this.authService.signInWithGoogle().pipe(
          map((credential) => {
            if (!credential) {
              return AuthActions.signInWithGoogleFailure({
                error: 'Login failed',
              });
            }
            return AuthActions.signInWithGoogleSuccess();
          }),
          catchError((error) => {
            return of(AuthActions.signInWithGoogleFailure({ error: error }));
          }),
        );
      }),
    ),
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      exhaustMap(() => {
        return this.authService.logout().pipe(
          map(() => {
            AuthActions.signOutSuccess();
            return AuthActions.signOutSuccess();
          }),
          catchError((error) => {
            return of(AuthActions.signOutFailure({ error: error }));
          }),
        );
      }),
    ),
  );

  signInWithStaticUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInWithStaticUser),
      exhaustMap((action) => {
        return this.authService
          .signInWithStaticUser(action.email, action.password)
          .pipe(
            map((response) => {
              this.saveTokenInSession(response.access_token);
              return AuthActions.signInWithStaticUserSuccess({
                idToken: response.access_token,
              });
            }),
            catchError((error) => {
              return of(
                AuthActions.signInWithStaticUserFailure({ error: error }),
              );
            }),
          );
      }),
    ),
  );

  saveTokenInSession(idToken: string) {
    sessionStorage.setItem('idToken', idToken);
  }

  removeTokenInSession() {
    sessionStorage.removeItem('idToken');
  }

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}
}
