import { createAction, props } from '@ngrx/store';
import { UserEbookModel } from '../../models/user-ebook.model';

export const create = createAction(
  '[User Ebook] Create',
  props<{ userEbook: UserEbookModel }>(),
);
export const createSuccess = createAction('[User Ebook] Create Success');
export const createError = createAction(
  '[User Ebook] Create Error',
  props<{ error: any }>(),
);

export const findAllByUserId = createAction('[Ebook] Find All By User Id');
export const findAllByUserIdSuccess = createAction(
  '[User Ebook] Find All By User Id Success',
  props<{
    userEbooks: UserEbookModel[];
  }>(),
);
export const findAllByUserIdError = createAction(
  '[User Ebook] Find All By User Id Error',
  props<{ error: any }>(),
);

export const findOneByEbookIdAndUserId = createAction(
  '[User Ebook] Find One By Ebook Id And User Id',
  props<{
    ebookId: string;
  }>(),
);
export const findOneByEbookIdAndUserIdSuccess = createAction(
  '[User Ebook] Find One By Ebook Id And User Id Success',
  props<{
    userEbook: UserEbookModel;
  }>(),
);
export const findOneByEbookIdAndUserIdError = createAction(
  '[User Ebook] Find One By Ebook Id And User Id Error',
  props<{
    error: any;
  }>(),
);

export const read = createAction(
  '[User Ebook] Read',
  props<{
    ebookId: string;
    userEbook: UserEbookModel;
  }>(),
);
export const readSuccess = createAction('[User Ebook] Read Success');
export const readError = createAction(
  '[User Ebook] Read Error',
  props<{ error: any }>(),
);

export const finishReading = createAction(
  '[User Ebook] Finish Reading',
  props<{
    ebookId: string;
    userEbook: UserEbookModel;
  }>(),
);
export const finishReadingSuccess = createAction(
  '[User Ebook] Finish Reading Success',
);
export const finishReadingError = createAction(
  '[User Ebook] Finish Reading Error',
  props<{ error: any }>(),
);
