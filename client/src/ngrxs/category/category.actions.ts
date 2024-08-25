import { createAction, props } from '@ngrx/store';
import { CategoryModel } from '../../models/category.model';

export const getAll = createAction('[Category] Get All');
export const getAllSuccess = createAction(
  '[Category] Get All Success',
  props<{ categories: CategoryModel[] }>(),
);
export const getAllFailure = createAction(
  '[Category] Get All Failure',
  props<{ error: any }>(),
);
