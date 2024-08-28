import { CommentState } from './comment.state';
import * as CommentActions from './comment.actions';
import { createReducer, on } from '@ngrx/store';

const initialState: CommentState = {
  comments: [],
  isLoadingComments: false,
  isLoadingCommentsError: null,

  selectedComment: null,
  isLoadingSelectedComment: false,
  isLoadingSelectedCommentError: null,

  isCreatingComment: false,
  isCreatingCommentSuccess: false,
  isCreatingCommentError: null,

  isUpdatingComment: false,
  isUpdatingCommentSuccess: false,
  isUpdatingCommentError: null,

  findingAllEbookId: false,
  findingAllEbookIdSuccess: false,
  findingAllEbookIdError: null,

  findingAllUserId: false,
  findingAllUserIdSuccess: false,
  findingAllUserIdError: null,

  findingOne: false,
  findingOneSuccess: false,
  findingOneError: null,
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
  on(CommentActions.updateComment, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isUpdatingComment: true,
      isUpdatingCommentSuccess: false,
      isUpdatingCommentError: null,
    };
  }),
  on(CommentActions.updateCommentSuccess, (state) => {
    console.log(CommentActions.updateCommentSuccess.type);
    return <CommentState>{
      ...state,
      isUpdatingComment: false,
      isUpdatingCommentSuccess: true,
    };
  }),
  on(CommentActions.updateCommentError, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isUpdatingComment: false,
      isUpdatingCommentError: action.error,
    };
  }),
  on(CommentActions.loadAll, (state) => {
    console.log(CommentActions.loadAll.type);
    return <CommentState>{
      ...state,
      isLoadingComments: true,
      isLoadingCommentsError: null,
    };
  }),
  on(CommentActions.loadAllSuccess, (state, action) => {
    console.log(CommentActions.loadAllSuccess.type);
    return <CommentState>{
      ...state,
      isLoadingComments: false,
      comments: action.comments,
    };
  }),
  on(CommentActions.loadAllError, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isLoadingComments: false,
      isLoadingCommentsError: action.error,
    };
  }),
  on(CommentActions.findAllEbookId, (state) => {
    console.log(CommentActions.findAllEbookId.type);
    return <CommentState>{
      ...state,
      findingAllEbookId: true,
      findingAllEbookIdSuccess: false,
      findingAllEbookIdError: null,
    };
  }),
  on(CommentActions.findAllEbookIdSuccess, (state, action) => {
    console.log(CommentActions.findAllEbookIdSuccess.type);
    return <CommentState>{
      ...state,
      findingAllEbookId: false,
      comments: action.comments,
    };
  }),
  on(CommentActions.findAllEbookIdError, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      findingAllEbookId: false,
      findingAllEbookIdError: action.error,
    };
  }),
  on(CommentActions.findAllUserId, (state) => {
    console.log(CommentActions.findAllUserId.type);
    return <CommentState>{
      ...state,
      findingAllUserId: true,
      findingAllUserIdSuccess: false,
      findingAllUserIdError: null,
    };
  }),
  on(CommentActions.findAllUserIdSuccess, (state, action) => {
    console.log(CommentActions.findAllUserIdSuccess.type);
    return <CommentState>{
      ...state,
      findingAllUserId: false,
      comments: action.comments,
    };
  }),
  on(CommentActions.findAllUserIdError, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      findingAllUserId: false,
      findingAllUserIdError: action.error,
    };
  }),
  on(CommentActions.findOne, (state) => {
    console.log(CommentActions.findOne.type);
    return <CommentState>{
      ...state,
      findingOne: true,
      findingOneSuccess: false,
      findingOneError: null,
    };
  }),
  on(CommentActions.findOneSuccess, (state, action) => {
    console.log(CommentActions.findOneSuccess.type);
    return <CommentState>{
      ...state,
      findingOne: false,
      selectedComment: action.comment,
    };
  }),
  on(CommentActions.findOneError, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      findingOne: false,
      findingOneError: action.error,
    };
  }),
);
