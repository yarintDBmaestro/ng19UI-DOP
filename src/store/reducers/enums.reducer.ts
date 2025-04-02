import { createReducer, createAction, on } from '@ngrx/store';


export const enumsActions = {
  CONFLICT_RESOLVE_ACTION_TYPES: 'CONFLICT_RESOLVE_ACTION_TYPES',
  CONTINUOUS_INTEGRATION_TYPES: 'CONTINUOUS_INTEGRATION_TYPES',
  DUPLICATION_ACTION_TYPES: 'DUPLICATION_ACTION_TYPES',
  FILE_VERSION_CONTROL_TYPES: 'FILE_VERSION_CONTROL_TYPES',
  DEPLOY_MODE_TYPES: 'DEPLOY_MODE_TYPES',
  SET_ENUMS: 'SET_ENUMS',
  DB_TYPES: 'DB_TYPES',
  SOURCE_CONTROL_PATH_TYPES: 'SOURCE_CONTROL_PATH_TYPES'
};
// Define actions
export const setEnums = createAction('[Enums] Set', (payload: any) => ({ payload }));

// Define initial state
const initialState = {
  dbTypes: [],
  conflictResolveActions: []
};

// Define reducer
export const enumsReducer = createReducer(
  initialState,
  on(setEnums, (state, { payload }) => ({ ...state, ...payload }))
);