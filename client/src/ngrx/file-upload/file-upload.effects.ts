import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CloudStorageService } from '../../services/cloud-storage.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UploadActions from './file-upload.actions';
import { of } from 'rxjs';

@Injectable()
export class FileUploadEffects {
  constructor(
    private actions$: Actions,
    private cloudStorageService: CloudStorageService,
  ) {}

  uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadActions.uploadFile),
      mergeMap(({ file, path }) =>
        this.cloudStorageService.uploadFile(file, path).pipe(
          map((result) => {
            if (typeof result === 'number') {
              return UploadActions.uploadFileProgress({ progress: result });
            } else {
              return UploadActions.uploadFileSuccess({ downloadURL: result });
            }
          }),
          catchError((error) => of(UploadActions.uploadFileFailure({ error }))),
        ),
      ),
    ),
  );
}
