import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from '../reducers/project.reducer';

// Select the project feature state
export const selectProjectState = createFeatureSelector<ProjectState>('project');

// Select DB Type Flags
export const selectDbTypeFlags = createSelector(
  selectProjectState,
  (state: ProjectState) => state.dbTypeFlags
);

export const selectDbTypeFlagsById = (dbTypeId: string) => createSelector(
  selectDbTypeFlags,
  (flags) => flags[dbTypeId]
);

// Select DB Type Images
export const selectDbTypeImages = createSelector(
  selectProjectState,
  (state: ProjectState) => state.dbTypeImages
);

export const selectDbTypeImageById = (dbTypeId: string) => createSelector(
  selectDbTypeImages,
  (images) => images[dbTypeId]
);

// Select loading state
export const selectProjectLoading = createSelector(
  selectProjectState,
  (state: ProjectState) => state.loading
);

// Select error state
export const selectProjectError = createSelector(
  selectProjectState,
  (state: ProjectState) => state.error
); 