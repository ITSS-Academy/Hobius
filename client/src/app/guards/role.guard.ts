import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../ngrxs/auth/auth.state';
import { map } from 'rxjs/operators';

export const canActivateAdmin: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store<{ auth: AuthState }>);

  return store.select('auth', 'isStaticUser').pipe(
    map((isStaticUser) => {
      if (isStaticUser) {
        return true;
      } else {
        router.navigate(['/']).then(() => {
          console.log('User is not admin');
        });
        return false;
      }
    }),
  );
};
