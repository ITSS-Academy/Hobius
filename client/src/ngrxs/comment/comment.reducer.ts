import { CommentState } from './comment.state';
import * as CommentActions from './comment.actions';
import { createReducer, on } from '@ngrx/store';

const initialState: CommentState = {
  selectedComment: null,
  isLoadingSelectedComment: false,
  isLoadingSelectedCommentError: undefined,
  isCreatingComment: false,
  isCreatingCommentSuccess: false,
  isCreatingCommentError: undefined,
  isUpdatingComment: false,
  isUpdatingCommentSuccess: false,
  isUpdatingCommentError: undefined,
  ebookCommentList: [],
  isFindingAllByEbookId: false,
  findingAllByEbookIdError: undefined,
  userCommentList: [],
  isFindingAllByUserId: false,
  findingAllByUserIdError: undefined,
};

export const commentReducer = createReducer(
  initialState,
  on(CommentActions.create, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isCreatingComment: true,
      isCreatingCommentSuccess: false,
      isCreatingCommentError: null,
    };
  }),
  on(CommentActions.createSuccess, (state) => {
    console.log(CommentActions.createSuccess.type);
    return <CommentState>{
      ...state,
      isCreatingComment: false,
      isCreatingCommentSuccess: true,
    };
  }),
  on(CommentActions.createError, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isCreatingComment: false,
      isCreatingCommentError: action.error,
    };
  }),

  on(CommentActions.update, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isUpdatingComment: true,
      isUpdatingCommentSuccess: false,
      isUpdatingCommentError: null,
    };
  }),
  on(CommentActions.updateSuccess, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isUpdatingComment: false,
      isUpdatingCommentSuccess: true,
    };
  }),
  on(CommentActions.updateError, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isUpdatingComment: false,
      isUpdatingCommentError: action.error,
    };
  }),

  on(CommentActions.findAllByEbookId, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      ebookCommentList: [],
      isFindingAllByEbookId: true,
      findingAllByEbookIdError: null,
    };
  }),
  on(CommentActions.findAllByEbookIdSuccess, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isFindingAllByEbookId: false,
      ebookCommentList: action.comments,
    };
  }),
  on(CommentActions.findAllByEbookIdError, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isFindingAllByEbookId: false,
      findingAllByEbookIdError: action.error,
    };
  }),

  on(CommentActions.findAllByUserId, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      userCommentList: [],
      isFindingAllByUserId: true,
      findingAllByUserIdError: null,
    };
  }),
  on(CommentActions.findAllByUserIdSuccess, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isFindingAllByUserId: false,
      userCommentList: action.comments,
    };
  }),
  on(CommentActions.findAllByUserIdError, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isFindingAllByUserId: false,
      findingAllByUserIdError: action.error,
    };
  }),

  on(CommentActions.findOne, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isLoadingSelectedComment: true,
      selectedComment: null,
      isLoadingSelectedCommentError: null,
    };
  }),
  on(CommentActions.findOneSuccess, (state, action) => {
    console.log(CommentActions.findOneSuccess.type);
    return <CommentState>{
      ...state,
      isLoadingSelectedComment: false,
      selectedComment: action.comment,
    };
  }),
  on(CommentActions.findOneError, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isLoadingSelectedComment: false,
      isLoadingSelectedCommentError: action.error,
    };
  }),
  on(CommentActions.reset, (state) => {
    console.log(CommentActions.reset.type);
    return <CommentState>{
      ...state,
      selectedComment: null,
      isLoadingSelectedComment: false,
      isLoadingSelectedCommentError: undefined,
      isCreatingComment: false,
      isCreatingCommentSuccess: false,
      isCreatingCommentError: undefined,
      isUpdatingComment: false,
      isUpdatingCommentSuccess: false,
      isUpdatingCommentError: undefined,
      ebookCommentList: [],
      isFindingAllByEbookId: false,
      findingAllByEbookIdError: undefined,
      userCommentList: [],
      isFindingAllByUserId: false,
      findingAllByUserIdError: undefined,
    };
  }),
);
