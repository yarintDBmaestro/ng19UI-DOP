import { createAction, props } from '@ngrx/store';

// Load enums actions
export const loadDeployModeTypes = createAction('[Enums] Load Deploy Mode Types');
export const loadSourceControlPathTypes = createAction('[Enums] Load Source Control Path Types');
export const loadConflictResolveActionTypes = createAction('[Enums] Load Conflict Resolve Action Types');
export const loadContinuousIntegrationTypes = createAction('[Enums] Load Continuous Integration Types');
export const loadDuplicationActionTypes = createAction('[Enums] Load Duplication Action Types');
export const loadFileVersionControlTypes = createAction('[Enums] Load File Version Control Types');
export const loadDbTypes = createAction('[Enums] Load DB Types');

// Success actions
export const loadDeployModeTypesSuccess = createAction(
  '[Enums] Load Deploy Mode Types Success',
  props<{ deployModeTypes: any[] }>()
);

export const loadSourceControlPathTypesSuccess = createAction(
  '[Enums] Load Source Control Path Types Success',
  props<{ sourceControlPathTypes: any[] }>()
);

export const loadConflictResolveActionTypesSuccess = createAction(
  '[Enums] Load Conflict Resolve Action Types Success',
  props<{ conflictResolveActionTypes: any[] }>()
);

export const loadContinuousIntegrationTypesSuccess = createAction(
  '[Enums] Load Continuous Integration Types Success',
  props<{ continuousIntegrationTypes: any[] }>()
);

export const loadDuplicationActionTypesSuccess = createAction(
  '[Enums] Load Duplication Action Types Success',
  props<{ duplicationActionTypes: any[] }>()
);

export const loadFileVersionControlTypesSuccess = createAction(
  '[Enums] Load File Version Control Types Success',
  props<{ fileVersionControlTypes: any[] }>()
);

export const loadDbTypesSuccess = createAction(
  '[Enums] Load DB Types Success',
  props<{ dbTypes: any[] }>()
);

// Failure actions
export const loadEnumsFailure = createAction(
  '[Enums] Load Enums Failure',
  props<{ error: any }>()
); 