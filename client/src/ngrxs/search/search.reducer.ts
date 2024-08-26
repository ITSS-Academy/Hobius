import { SearchState } from './search.state';
import { createReducer, on } from '@ngrx/store';
import * as SearchActions from './search.actions';

const initialState: SearchState = {
  searchResults: [],
  loading: false,
  error: null,
};

export const searchReducer = createReducer(
  initialState,
  on(SearchActions.search, (state, action) => {
    console.log(action.type);
    return <SearchState>{
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(SearchActions.searchSuccess, (state, action) => {
    console.log(action.type);
    return <SearchState>{
      ...state,
      searchResults: action.searchResults,
      loading: false,
      error: null,
    };
  }),
  on(SearchActions.searchFailure, (state, action) => {
    console.log(action.type);
    return <SearchState>{
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
