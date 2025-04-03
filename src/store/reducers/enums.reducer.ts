import { createReducer, on } from '@ngrx/store';
import {
  loadDeployModeTypesSuccess,
  loadSourceControlPathTypesSuccess,
  loadConflictResolveActionTypesSuccess,
  loadContinuousIntegrationTypesSuccess,
  loadDuplicationActionTypesSuccess,
  loadFileVersionControlTypesSuccess,
  loadDbTypesSuccess,
  loadEnumsFailure
} from '../actions/enums.actions';

export interface EnumsState {
  deployModeTypes: any[];
  sourceControlPathTypes: any[];
  conflictResolveActionTypes: any[];
  continuousIntegrationTypes: any[];
  duplicationActionTypes: any[];
  fileVersionControlTypes: any[];
  dbTypes: any[];
  error: any;
  loading: boolean;
}

const initialState: EnumsState = {
  deployModeTypes: [],
  sourceControlPathTypes: [],
  conflictResolveActionTypes: [],
  continuousIntegrationTypes: [],
  duplicationActionTypes: [],
  fileVersionControlTypes: [],
  dbTypes: [],
  error: null,
  loading: false
};

export const enumsReducer = createReducer(
  initialState,
  
  // Success actions
  on(loadDeployModeTypesSuccess, (state, { deployModeTypes }) => ({
    ...state,
    deployModeTypes,
    error: null,
    loading: false
  })),
  
  on(loadSourceControlPathTypesSuccess, (state, { sourceControlPathTypes }) => ({
    ...state,
    sourceControlPathTypes,
    error: null,
    loading: false
  })),
  
  on(loadConflictResolveActionTypesSuccess, (state, { conflictResolveActionTypes }) => ({
    ...state,
    conflictResolveActionTypes,
    error: null,
    loading: false
  })),
  
  on(loadContinuousIntegrationTypesSuccess, (state, { continuousIntegrationTypes }) => ({
    ...state,
    continuousIntegrationTypes,
    error: null,
    loading: false
  })),
  
  on(loadDuplicationActionTypesSuccess, (state, { duplicationActionTypes }) => ({
    ...state,
    duplicationActionTypes,
    error: null,
    loading: false
  })),
  
  on(loadFileVersionControlTypesSuccess, (state, { fileVersionControlTypes }) => ({
    ...state,
    fileVersionControlTypes,
    error: null,
    loading: false
  })),
  
  on(loadDbTypesSuccess, (state, { dbTypes }) => ({
    ...state,
    dbTypes,
    error: null,
    loading: false
  })),
  
  // Failure action
  on(loadEnumsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);