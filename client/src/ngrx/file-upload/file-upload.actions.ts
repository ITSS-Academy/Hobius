import { createAction, props } from '@ngrx/store';

export const uploadFile = createAction(
  '[File Upload] Upload File',
  props<{ file: File; path: string }>(),
);

export const uploadFileSuccess = createAction(
  '[File Upload] Upload File Success',
  props<{ downloadURL: string }>(),
);

export const uploadFileFailure = createAction(
  '[File Upload] Upload File Failure',
  props<{ error: any }>(),
);

export const uploadFileProgress = createAction(
  '[File Upload] Upload File Progress',
  props<{ progress: number }>(),
);
