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

  uploadEbookCoverFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadActions.uploadEbookCoverFile),
      mergeMap(({ file, path, isPdf }) =>
        this.cloudStorageService.uploadFile(file, path, isPdf).pipe(
          map((result) => {
            if (typeof result === 'number') {
              return UploadActions.uploadFileProgress({ progress: result });
            } else {
              return UploadActions.uploadEbookCoverFileSuccess({
                downloadURL: result,
              });
            }
          }),
          catchError((error) =>
            of(UploadActions.uploadEbookCoverFileFailure({ error })),
          ),
        ),
      ),
    ),
  );

  uploadEbookPdfFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadActions.uploadEbookPdfFile),
      mergeMap(({ file, path, isPdf }) =>
        this.cloudStorageService.uploadFile(file, path, isPdf).pipe(
          map((result) => {
            if (typeof result === 'number') {
              return UploadActions.uploadFileProgress({ progress: result });
            } else {
              return UploadActions.uploadEbookPdfFileSuccess({
                downloadURL: result,
              });
            }
          }),
          catchError((error) =>
            of(UploadActions.uploadEbookPdfFileFailure({ error })),
          ),
        ),
      ),
    ),
  );
}
