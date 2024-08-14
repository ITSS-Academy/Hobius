import { createReducer, on } from '@ngrx/store';
import * as UploadActions from './file-upload.actions';
import { FileUploadState } from './file-upload.state';

export const initialState: FileUploadState = {
  progress: 0,
  downloadURL: null,
  error: null,
};

export const fileUploadReducer = createReducer(
  initialState,
  on(UploadActions.uploadFile, (state) => {
    return <FileUploadState>{
      ...state,
      progress: 0,
      downloadURL: null,
      error: null,
    };
  }),
  on(UploadActions.uploadFileSuccess, (state, { downloadURL }) => {
    return <FileUploadState>{
      ...state,
      downloadURL,
      error: null,
    };
  }),
  on(UploadActions.uploadFileFailure, (state, { error }) => {
    return <FileUploadState>{
      ...state,
      error,
    };
  }),
  on(UploadActions.uploadFileProgress, (state, { progress }) => {
    return <FileUploadState>{
      ...state,
      progress,
    };
  }),
);
