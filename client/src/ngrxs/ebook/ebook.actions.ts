import { createAction, props } from '@ngrx/store';
import { EbookModel } from '../../models/ebook.model';

export const create = createAction(
  '[Ebook] Create',
  props<{ ebook: EbookModel }>(),
);
export const createSuccess = createAction('[Ebook] Create Success');
export const createError = createAction(
  '[Ebook] Create Error',
  props<{ error: any }>(),
);

export const findAll = createAction('[Ebook] Find All');
export const findAllSuccess = createAction(
  '[Ebook] Find All Success',
  props<{ ebooks: EbookModel[] }>(),
);
export const findAllError = createAction(
  '[Ebook] Find All Error',
  props<{ error: any }>(),
);

export const listByTrend = createAction(
  '[Ebook] List By Trend',
  props<{ limit: number }>(),
);
export const listByTrendSuccess = createAction(
  '[Ebook] List By Trend Success',
  props<{ ebooks: EbookModel[] }>(),
);
export const listByTrendError = createAction(
  '[Ebook] List By Trend Error',
  props<{ error: any }>(),
);

export const listByRecommend = createAction(
  '[Ebook] List By Recommend',
  props<{ limit: number }>(),
);
export const listByRecommendSuccess = createAction(
  '[Ebook] List By Recommend Success',
  props<{
    ebooks: EbookModel[];
  }>(),
);
export const listByRecommendError = createAction(
  '[Ebook] List By Recommend Error',
  props<{ error: any }>(),
);

export const listByRating = createAction(
  '[Ebook] List By Rating',
  props<{ limit: number }>(),
);
export const listByRatingSuccess = createAction(
  '[Ebook] List By Rating Success',
  props<{ ebooks: EbookModel[] }>(),
);
export const listByRatingError = createAction(
  '[Ebook] List By Rating Error',
  props<{ error: any }>(),
);

export const findOne = createAction(
  '[Ebook] Find One',
  props<{ id: string }>(),
);
export const findOneSuccess = createAction(
  '[Ebook] Find One Success',
  props<{ ebook: EbookModel }>(),
);
export const findOneError = createAction(
  '[Ebook] Find One Error',
  props<{ error: any }>(),
);

export const update = createAction(
  '[Ebook] Update',
  props<{ id: string; ebook: EbookModel }>(),
);
export const updateSuccess = createAction('[Ebook] Update Success');
export const updateError = createAction(
  '[Ebook] Update Error',
  props<{ error: any }>(),
);

export const like = createAction('[Ebook] Like', props<{ id: string }>());
export const likeSuccess = createAction('[Ebook] Like Success');
export const likeError = createAction(
  '[Ebook] Like Error',
  props<{ error: any }>(),
);

export const unlike = createAction('[Ebook] Unlike', props<{ id: string }>());
export const unlikeSuccess = createAction('[Ebook] Unlike Success');
export const unlikeError = createAction(
  '[Ebook] Unlike Error',
  props<{ error: any }>(),
);

export const view = createAction('[Ebook] View', props<{ id: string }>());
export const viewSuccess = createAction('[Ebook] View Success');
export const viewError = createAction(
  '[Ebook] View Error',
  props<{ error: any }>(),
);

export const reset = createAction('[Ebook] Reset');
