import { createAction, props } from '@ngrx/store';

export const uploadEbookCoverFile = createAction(
  '[File Upload] Upload Ebook Cover File',
  props<{ file: File; path: string }>(),
);

export const uploadEbookCoverFileSuccess = createAction(
  '[File Upload] Upload Ebook Cover File Success',
  props<{ downloadURL: string }>(),
);

export const uploadEbookCoverFileFailure = createAction(
  '[File Upload] Upload Ebook Cover File Failure',
  props<{ error: any }>(),
);

export const uploadEbookPdfFile = createAction(
  '[File Upload] Upload Ebook Pdf File',
  props<{ file: File; path: string }>(),
);

export const uploadEbookPdfFileSuccess = createAction(
  '[File Upload] Upload Ebook Pdf File Success',
  props<{ downloadURL: string }>(),
);

export const uploadEbookPdfFileFailure = createAction(
  '[File Upload] Upload Ebook Pdf File Failure',
  props<{ error: any }>(),
);

export const uploadFileProgress = createAction(
  '[File Upload] Upload File Progress',
  props<{ progress: number }>(),
);

export const reset = createAction('[File Upload] Reset');
