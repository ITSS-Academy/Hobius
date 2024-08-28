import { UserEbookState } from './user-ebook.state';
import { createReducer, on } from '@ngrx/store';
import * as UserEbookActions from './user-ebook.actions';

const initialState: UserEbookState = {
  readingHistoryList: [],
  isLoadingReadingHistoryList: false,
  errorReadingHistoryList: undefined,
  currentReading: null,
  isLoadingCurrentReading: false,
  errorCurrentReading: undefined,
  isCreating: false,
  isCreatingSuccess: false,
  errorCreating: undefined,
  isUpdating: false,
  isUpdatingSuccess: false,
  errorUpdating: undefined,
};

export const userEbookReducer = createReducer(
  initialState,
  on(UserEbookActions.create, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      isCreating: true,
      isCreatingSuccess: false,
      errorCreating: undefined,
    };
  }),
  on(UserEbookActions.createSuccess, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      isCreating: false,
      isCreatingSuccess: true,
    };
  }),
  on(UserEbookActions.createError, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      isCreating: false,
      errorCreating: action.error,
    };
  }),
  on(UserEbookActions.findAllByUserId, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      isLoadingReadingHistoryList: true,
      errorReadingHistoryList: undefined,
    };
  }),
  on(UserEbookActions.findAllByUserIdSuccess, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      readingHistoryList: action.userEbooks,
      isLoadingReadingHistoryList: false,
    };
  }),
  on(UserEbookActions.findAllByUserIdError, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      isLoadingReadingHistoryList: false,
      errorReadingHistoryList: action.error,
    };
  }),
  on(UserEbookActions.findOneByEbookIdAndUserId, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      isLoadingCurrentReading: true,
      errorCurrentReading: undefined,
    };
  }),
  on(UserEbookActions.findOneByEbookIdAndUserIdSuccess, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      currentReading: action.userEbook,
      isLoadingCurrentReading: false,
    };
  }),
  on(UserEbookActions.findOneByEbookIdAndUserIdError, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      isLoadingCurrentReading: false,
      errorCurrentReading: action.error,
    };
  }),
  on(UserEbookActions.read, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      isUpdating: true,
      isUpdatingSuccess: false,
      errorUpdating: undefined,
    };
  }),
  on(UserEbookActions.readSuccess, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      isUpdating: false,
      isUpdatingSuccess: true,
    };
  }),
  on(UserEbookActions.readError, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      isUpdating: false,
      errorUpdating: action.error,
    };
  }),
  on(UserEbookActions.finishReading, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      isUpdating: true,
      isUpdatingSuccess: false,
      errorUpdating: undefined,
    };
  }),
  on(UserEbookActions.finishReadingSuccess, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      isUpdating: false,
      isUpdatingSuccess: true,
    };
  }),
  on(UserEbookActions.finishReadingError, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      isUpdating: false,
      errorUpdating: action.error,
    };
  }),
  on(UserEbookActions.reset, (state, action) => {
    console.log(action.type);
    return <UserEbookState>{
      ...state,
      readingHistoryList: [],
      isLoadingReadingHistoryList: false,
      errorReadingHistoryList: undefined,
      currentReading: null,
      isLoadingCurrentReading: false,
      errorCurrentReading: undefined,
      isCreating: false,
      isCreatingSuccess: false,
      errorCreating: undefined,
      isUpdating: false,
      isUpdatingSuccess: false,
      errorUpdating: undefined,
    };
  })
);
