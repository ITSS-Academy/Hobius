import { EbookState } from './ebook.state';
import { createReducer, on } from '@ngrx/store';
import * as EbookActions from './ebook.actions';

const initialState: EbookState = {
  ebooks: [],
  isLoadingEbooks: false,
  isLoadingEbooksError: null,

  selectedEbook: null,
  isLoadingSelectedEbook: false,
  isLoadingSelectedEbookError: null,

  isCreatingEbook: false,
  isCreatingEbookSuccess: false,
  isCreatingEbookError: null,

  isUpdatingEbook: false,
  isUpdatingEbookSuccess: false,
  isUpdatingEbookError: null,

  trendingEbooks: [],
  isLoadingTrendingEbooks: false,
  isLoadingTrendingEbooksError: null,

  recommendEbooks: [],
  isLoadingRecommendEbooks: false,
  isLoadingRecommendEbooksError: null,

  ratingEbooks: [],
  isLoadingRatingEbooks: false,
  isLoadingRatingEbooksError: null,

  isLikingEbook: false,
  isLikingEbookSuccess: false,
  isLikingEbookError: null,

  isUnlikingEbook: false,
  isUnlikingEbookSuccess: false,
  isUnlikingEbookError: null,

  isViewingEbook: false,
  isViewingEbookSuccess: false,
  isViewingEbookError: null,
};

export const ebookReducer = createReducer(
  initialState,
  on(EbookActions.create, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isCreatingEbook: true,
      isCreatingEbookSuccess: false,
      isCreatingEbookError: null,
    };
  }),
  on(EbookActions.createSuccess, (state) => {
    console.log(EbookActions.createSuccess.type);
    return <EbookState>{
      ...state,
      isCreatingEbook: false,
      isCreatingEbookSuccess: true,
    };
  }),
  on(EbookActions.createError, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isCreatingEbook: false,
      isCreatingEbookError: action.error,
    };
  }),
  on(EbookActions.findAll, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoadingEbooks: true,
      isLoadingEbooksError: null,
    };
  }),
  on(EbookActions.findAllSuccess, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoadingEbooks: false,
      ebooks: action.ebooks,
    };
  }),
  on(EbookActions.findAllError, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoadingEbooks: false,
      isLoadingEbooksError: action.error,
    };
  }),
  on(EbookActions.listByTrend, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoadingTrendingEbooks: true,
      isLoadingTrendingEbooksError: null,
    };
  }),
  on(EbookActions.listByTrendSuccess, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoadingTrendingEbooks: false,
      trendingEbooks: action.ebooks,
    };
  }),
  on(EbookActions.listByTrendError, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoadingTrendingEbooks: false,
      isLoadingTrendingEbooksError: action.error,
    };
  }),
  on(EbookActions.listByRating, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoadingRatingEbooks: true,
      isLoadingRatingEbooksError: null,
    };
  }),
  on(EbookActions.listByRatingSuccess, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoadingRatingEbooks: false,
      ratingEbooks: action.ebooks,
    };
  }),
  on(EbookActions.listByRatingError, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoadingRatingEbooks: false,
      isLoadingRatingEbooksError: action.error,
    };
  }),
  on(EbookActions.listByRecommend, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoadingRecommendEbooks: true,
      isLoadingRecommendEbooksError: null,
    };
  }),
  on(EbookActions.listByRecommendSuccess, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoadingRecommendEbooks: false,
      recommendEbooks: action.ebooks,
    };
  }),
  on(EbookActions.listByRecommendError, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoadingRecommendEbooks: false,
      isLoadingRecommendEbooksError: action.error,
    };
  }),
  on(EbookActions.findOne, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoadingSelectedEbook: true,
      isLoadingSelectedEbookError: null,
    };
  }),
  on(EbookActions.findOneSuccess, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoadingSelectedEbook: false,
      selectedEbook: action.ebook,
    };
  }),
  on(EbookActions.findOneError, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLoadingSelectedEbook: false,
      isLoadingSelectedEbookError: action.error,
    };
  }),
  on(EbookActions.update, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isUpdatingEbook: true,
      isUpdatingEbookSuccess: false,
      isUpdatingEbookError: null,
    };
  }),
  on(EbookActions.updateSuccess, (state) => {
    console.log(EbookActions.updateSuccess.type);
    return <EbookState>{
      ...state,
      isUpdatingEbook: false,
      isUpdatingEbookSuccess: true,
    };
  }),
  on(EbookActions.updateError, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isUpdatingEbook: false,
      isUpdatingEbookSuccess: false,
      isUpdatingEbookError: action.error,
    };
  }),
  on(EbookActions.like, (state) => {
    console.log(EbookActions.like.type);
    return <EbookState>{
      ...state,
      isLikingEbook: true,
      isLikingEbookSuccess: false,
      isLikingEbookError: null,
    };
  }),
  on(EbookActions.likeSuccess, (state) => {
    console.log(EbookActions.likeSuccess.type);
    return <EbookState>{
      ...state,
      isLikingEbook: false,
      isLikingEbookSuccess: true,
    };
  }),
  on(EbookActions.likeError, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isLikingEbook: false,
      isLikingEbookError: action.error,
    };
  }),
  on(EbookActions.unlike, (state) => {
    console.log(EbookActions.unlike.type);
    return <EbookState>{
      ...state,
      isUnlikingEbook: true,
      isUnlikingEbookSuccess: false,
      isUnlikingEbookError: null,
    };
  }),
  on(EbookActions.unlikeSuccess, (state) => {
    console.log(EbookActions.unlikeSuccess.type);
    return <EbookState>{
      ...state,
      isUnlikingEbook: false,
      isUnlikingEbookSuccess: true,
    };
  }),
  on(EbookActions.unlikeError, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isUnlikingEbook: false,
      isUnlikingEbookError: action.error,
    };
  }),
  on(EbookActions.view, (state) => {
    console.log(EbookActions.view.type);
    return <EbookState>{
      ...state,
      isViewingEbook: true,
      isViewingEbookSuccess: false,
      isViewingEbookError: null,
    };
  }),
  on(EbookActions.viewSuccess, (state) => {
    console.log(EbookActions.viewSuccess.type);
    return <EbookState>{
      ...state,
      isViewingEbook: false,
      isViewingEbookSuccess: true,
    };
  }),
  on(EbookActions.viewError, (state, action) => {
    console.log(action.type);
    return <EbookState>{
      ...state,
      isViewingEbook: false,
      isViewingEbookError: action.error,
    };
  }),
  on(EbookActions.reset, (state) => {
    console.log(EbookActions.reset.type);
    return <EbookState>{
      ...state,
      isCreatingEbookSuccess: false,
      isCreatingEbookError: null,

      isUpdatingEbookSuccess: false,
      isUpdatingEbookError: null,

      isLoadingEbooksError: null,
      ebooks: [],

      isLoadingSelectedEbookError: null,
      selectedEbook: null,

      isLoadingTrendingEbooksError: null,
      trendingEbooks: [],

      isLoadingRecommendEbooksError: null,
      recommendEbooks: [],

      isLoadingRatingEbooksError: null,
      ratingEbooks: [],

      isUnlikingEbookError: null,
      isUnlikingEbookSuccess: false,

      isLikingEbookError: null,
      isLikingEbookSuccess: false,
    };
  }),
);
