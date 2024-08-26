import { createAction, props } from '@ngrx/store';
import { EbookModel } from '../../models/ebook.model';

export const search = createAction('[Search] Search', props<{ q: string }>());
export const searchSuccess = createAction(
  '[Search] Search Success',
  props<{ searchResults: EbookModel[] }>(),
);
export const searchFailure = createAction(
  '[Search] Search Failure',
  props<{ error: any }>(),
);
