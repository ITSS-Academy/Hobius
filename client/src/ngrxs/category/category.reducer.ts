import { CategoryState } from './category.state';
import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.actions';

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.getAll, (state, action) => {
    console.log(action.type);
    return <CategoryState>{
      ...state,
      isLoading: true,
      error: null,
      categories: [],
    };
  }),
  on(CategoryActions.getAllSuccess, (state, action) => {
    console.log(action.type);
    return <CategoryState>{
      ...state,
      isLoading: false,
      categories: action.categories,
    };
  }),
  on(CategoryActions.getAllFailure, (state, action) => {
    console.log(action.type);
    return <CategoryState>{
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
);
