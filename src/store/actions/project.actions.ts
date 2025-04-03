import { createAction, props } from '@ngrx/store';

// DB Type Flags actions
export const getDbTypeFlags = createAction(
  '[Project] Get DB Type Flags',
  props<{ dbTypeId: string }>()
);

export const getDbTypeFlagsSuccess = createAction(
  '[Project] Get DB Type Flags Success',
  props<{ dbTypeId: string; flags: any }>()
);

export const getDbTypeFlagsFailure = createAction(
  '[Project] Get DB Type Flags Failure',
  props<{ error: any }>()
);

// DB Type Image actions
export const getDbTypeImage = createAction(
  '[Project] Get DB Type Image',
  props<{ dbTypeId: string }>()
);

export const getDbTypeImageSuccess = createAction(
  '[Project] Get DB Type Image Success',
  props<{ dbTypeId: string; image: any }>()
);

export const getDbTypeImageFailure = createAction(
  '[Project] Get DB Type Image Failure',
  props<{ error: any }>()
); 