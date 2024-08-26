import { createAction, props } from '@ngrx/store';
import { UserEbookModel } from '../../models/user-ebook.model';

export const create = createAction(
  '[Ebook] Create',
  props<{ userEbook: UserEbookModel }>(),
);
export const createSuccess = createAction('[Ebook] Create Success');
export const createError = createAction(
  '[Ebook] Create Error',
  props<{ error: any }>(),
);

export const findAllByUserId = createAction('[Ebook] Find All By User Id');
export const findAllByUserIdSuccess = createAction(
  '[Ebook] Find All By User Id Success',
  props<{
    userEbooks: UserEbookModel[];
  }>(),
);
export const findAllByUserIdError = createAction(
  '[Ebook] Find All By User Id Error',
  props<{ error: any }>(),
);

export const findOneByEbookIdAndUserId = createAction(
  '[Ebook] Find One By Ebook Id And User Id',
  props<{
    ebookId: string;
  }>(),
);
export const findOneByEbookIdAndUserIdSuccess = createAction(
  '[Ebook] Find One By Ebook Id And User Id Success',
  props<{
    userEbook: UserEbookModel;
  }>(),
);
export const findOneByEbookIdAndUserIdError = createAction(
  '[Ebook] Find One By Ebook Id And User Id Error',
  props<{
    error: any;
  }>(),
);

export const read = createAction(
  '[Ebook] Read',
  props<{
    ebookId: string;
    userEbook: UserEbookModel;
  }>(),
);
export const readSuccess = createAction('[Ebook] Read Success');
export const readError = createAction(
  '[Ebook] Read Error',
  props<{ error: any }>(),
);

export const finishReading = createAction(
  '[Ebook] Finish Reading',
  props<{
    ebookId: string;
    userEbook: UserEbookModel;
  }>(),
);
export const finishReadingSuccess = createAction(
  '[Ebook] Finish Reading Success',
);
export const finishReadingError = createAction(
  '[Ebook] Finish Reading Error',
  props<{ error: any }>(),
);
