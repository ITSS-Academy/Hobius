import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NotSignedInDialogComponent } from '../components/not-signed-in-dialog/not-signed-in-dialog.component';

export const canActivateProfile: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const dialog = inject(MatDialog);
  return inject(AuthService)
    .isSignedIn()
    .pipe(
      map((isSignedIn) => {
        if (isSignedIn) {
          return true;
        } else {
          dialog
            .open(NotSignedInDialogComponent)
            .afterClosed()
            .subscribe((result) => {
              if (result) {
                router.navigate(['/login']).then(() => {
                  console.log('[Profile] login button clicked');
                });
              } else {
                router.navigate(['/home']).then(() => {
                  console.log('[Profile] cancel button clicked');
                });
              }
            });
          return false;
        }
      }),
    );
};
