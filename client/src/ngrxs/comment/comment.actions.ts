import { createAction, props } from '@ngrx/store';
import { CommentModel } from '../../models/comment.model';

export const create = createAction(
  '[Comment] Create',
  props<{ comment: CommentModel }>(),
);
export const createSuccess = createAction('[Comment] Create Success');
export const createError = createAction(
  '[Comment] Create Error',
  props<{ error: any }>(),
);
export const updateComment = createAction(
  '[Comment] Update Comment',
  props<{ comment: CommentModel }>(),
);
export const updateCommentSuccess = createAction(
  '[Comment] Update Comment Success',
);
export const updateCommentError = createAction(
  '[Comment] Update Comment Error',
  props<{ error: any }>(),
);
export const loadAll = createAction('[Comment] Load All');
export const loadAllSuccess = createAction(
  '[Comment] Load All Success',
  props<{ comments: CommentModel[] }>(),
);
export const loadAllError = createAction(
  '[Comment] Load All Error',
  props<{ error: any }>(),
);
export const findAllEbookId = createAction(
  '[Comment] Find All Ebook Id',
  props<{ ebookId: string }>(),
);
export const findAllEbookIdSuccess = createAction(
  '[Comment] Find All Ebook Id Success',
  props<{ comments: any }>(),
);
export const findAllEbookIdError = createAction(
  '[Comment] Find All Ebook Id Error',
  props<{ error: any }>(),
);
export const findAllUserId = createAction(
  '[Comment] Find All User Id',
  props<{ userId: string }>(),
);
export const findAllUserIdSuccess = createAction(
  '[Comment] Find All User Id Success',
  props<{ comments: any }>(),
);
export const findAllUserIdError = createAction(
  '[Comment] Find All User Id Error',
  props<{ error: any }>(),
);
export const findOne = createAction(
  '[Comment] Find One',
  props<{ useId: string; ebookId: string }>(),
);
export const findOneSuccess = createAction(
  '[Comment] Find One Success',
  props<{ comment: any }>(),
);
export const findOneError = createAction(
  '[Comment] Find One Error',
  props<{ error: any }>(),
);
