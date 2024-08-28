import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../models/user.model';

export const create = createAction('[User] Create');
export const createSuccess = createAction('[User] Create Success');
export const createFailure = createAction(
  '[User] Create Failure',
  props<{ error: any }>(),
);

export const getById = createAction('[User] Get By Id');
export const getByIdSuccess = createAction(
  '[User] Get By Id Success',
  props<{ user: UserModel }>(),
);
export const getByIdFailure = createAction(
  '[User] Get By Id Failure',
  props<{ error: any }>(),
);

export const update = createAction(
  '[User] Update',
  props<{ user: UserModel }>(),
);
export const updateSuccess = createAction('[User] Update Success');
export const updateFailure = createAction(
  '[User] Update Failure',
  props<{ error: any }>(),
);

export const reset = createAction('[User] Reset');
