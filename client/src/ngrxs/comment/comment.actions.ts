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

export const update = createAction(
  '[Comment] Update Comment',
  props<{ comment: CommentModel }>(),
);
export const updateSuccess = createAction('[Comment] Update Comment Success');
export const updateError = createAction(
  '[Comment] Update Comment Error',
  props<{ error: any }>(),
);

export const findAllByEbookId = createAction(
  '[Comment] Find All By Ebook Id',
  props<{ ebookId: string }>(),
);
export const findAllByEbookIdSuccess = createAction(
  '[Comment] Find All By Ebook Id Success',
  props<{ comments: CommentModel[] }>(),
);
export const findAllByEbookIdError = createAction(
  '[Comment] Find All By Ebook Id Error',
  props<{ error: any }>(),
);
export const findAllByUserId = createAction(
  '[Comment] Find All By User Id',
  props<{ userId: string }>(),
);
export const findAllByUserIdSuccess = createAction(
  '[Comment] Find All By User Id Success',
  props<{ comments: CommentModel[] }>(),
);
export const findAllByUserIdError = createAction(
  '[Comment] Find All User Id Error',
  props<{ error: any }>(),
);
export const findOne = createAction(
  '[Comment] Find One',
  props<{ useId: string; ebookId: string }>(),
);
export const findOneSuccess = createAction(
  '[Comment] Find One Success',
  props<{ comment: CommentModel }>(),
);
export const findOneError = createAction(
  '[Comment] Find One Error',
  props<{ error: any }>(),
);
