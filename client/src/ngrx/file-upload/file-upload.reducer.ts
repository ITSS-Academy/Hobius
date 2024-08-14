import { createReducer, on } from '@ngrx/store';
import * as UploadActions from './file-upload.actions';
import { FileUploadState } from './file-upload.state';

export const initialState: FileUploadState = {
  isLoading: false,
  downloadCoverURL: null,
  downloadPdfURL: null,
  error: null,
};

export const fileUploadReducer = createReducer(
  initialState,
  on(UploadActions.uploadEbookCoverFile, (state, action) => {
    console.log(action.type);
    return <FileUploadState>{
      ...state,
      downloadCoverURL: null,
      error: null,
      isLoading: true,
    };
  }),
  on(UploadActions.uploadEbookCoverFileSuccess, (state, action) => {
    console.log(action.type);
    return <FileUploadState>{
      ...state,
      downloadCoverURL: action.downloadURL,
      isLoading: false,
      error: null,
    };
  }),
  on(UploadActions.uploadEbookCoverFileFailure, (state, action) => {
    console.log(action.type);
    return <FileUploadState>{
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(UploadActions.uploadEbookPdfFile, (state, action) => {
    console.log(action.type);
    return <FileUploadState>{
      ...state,
      progress: 0,
      downloadPdfURL: null,
      isLoading: true,
      error: null,
    };
  }),
  on(UploadActions.uploadEbookPdfFileSuccess, (state, action) => {
    console.log(action.type);
    return <FileUploadState>{
      ...state,
      downloadPdfURL: action.downloadURL,
      isLoading: false,
      error: null,
    };
  }),
  on(UploadActions.uploadEbookPdfFileFailure, (state, action) => {
    console.log(action.type);
    return <FileUploadState>{
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
);
