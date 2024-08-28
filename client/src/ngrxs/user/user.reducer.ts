import { UserState } from './user.state';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

const initialState: UserState = {
  user: null,
  isGetting: false,
  isGettingError: null,
  isCreating: false,
  isCreatingError: null,
  isCreatingSuccess: false,
  isUpdating: false,
  isUpdatingError: null,
  isUpdatingSuccess: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.create, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isCreating: true,
      isCreatingError: null,
      isCreatingSuccess: false,
    };
  }),
  on(UserActions.createSuccess, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isCreating: false,
      isCreatingSuccess: true,
    };
  }),
  on(UserActions.createFailure, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isCreating: false,
      isCreatingError: action.error,
    };
  }),
  on(UserActions.getById, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isGetting: true,
      isGettingError: null,
    };
  }),
  on(UserActions.getByIdSuccess, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      user: action.user,
      isGetting: false,
    };
  }),
  on(UserActions.getByIdFailure, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isGetting: false,
      isGettingError: action.error,
    };
  }),
  on(UserActions.update, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isUpdating: true,
      isUpdatingError: null,
      isUpdatingSuccess: false,
    };
  }),
  on(UserActions.updateSuccess, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isUpdating: false,
      isUpdatingSuccess: true,
    };
  }),
  on(UserActions.updateFailure, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isUpdating: false,
      isUpdatingError: action.error,
    };
  }),
  on(UserActions.reset, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isCreatingSuccess: false,
      isUpdatingSuccess: false,
      isGettingError: null,
      isCreatingError: null,
      isUpdatingError: null,
    };
  }),
);
