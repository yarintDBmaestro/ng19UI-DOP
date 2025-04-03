import { createReducer, on } from '@ngrx/store';
import {
  getDbTypeFlagsSuccess,
  getDbTypeFlagsFailure,
  getDbTypeImageSuccess,
  getDbTypeImageFailure
} from '../actions/project.actions';

export interface ProjectState {
  dbTypeFlags: { [key: string]: any };
  dbTypeImages: { [key: string]: any };
  error: any;
  loading: boolean;
}

const initialState: ProjectState = {
  dbTypeFlags: {},
  dbTypeImages: {},
  error: null,
  loading: false
};

export const projectReducer = createReducer(
  initialState,
  
  // DB Type Flags
  on(getDbTypeFlagsSuccess, (state, { dbTypeId, flags }) => ({
    ...state,
    dbTypeFlags: {
      ...state.dbTypeFlags,
      [dbTypeId]: flags
    },
    error: null,
    loading: false
  })),
  
  on(getDbTypeFlagsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  
  // DB Type Images
  on(getDbTypeImageSuccess, (state, { dbTypeId, image }) => ({
    ...state,
    dbTypeImages: {
      ...state.dbTypeImages,
      [dbTypeId]: image
    },
    error: null,
    loading: false
  })),
  
  on(getDbTypeImageFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
); 