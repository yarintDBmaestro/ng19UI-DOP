import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnumsState } from '../reducers/enums.reducer';

// Select the enums feature state
export const selectEnumsState = createFeatureSelector<EnumsState>('enums');

// Select individual enum types
export const selectDeployModeTypes = createSelector(
  selectEnumsState,
  (state: EnumsState) => state.deployModeTypes
);

export const selectSourceControlPathTypes = createSelector(
  selectEnumsState,
  (state: EnumsState) => state.sourceControlPathTypes
);

export const selectConflictResolveActionTypes = createSelector(
  selectEnumsState,
  (state: EnumsState) => state.conflictResolveActionTypes
);

export const selectContinuousIntegrationTypes = createSelector(
  selectEnumsState,
  (state: EnumsState) => state.continuousIntegrationTypes
);

export const selectDuplicationActionTypes = createSelector(
  selectEnumsState,
  (state: EnumsState) => state.duplicationActionTypes
);

export const selectFileVersionControlTypes = createSelector(
  selectEnumsState,
  (state: EnumsState) => state.fileVersionControlTypes
);

export const selectDbTypes = createSelector(
  selectEnumsState,
  (state: EnumsState) => state.dbTypes
);

// Select loading state
export const selectEnumsLoading = createSelector(
  selectEnumsState,
  (state: EnumsState) => state.loading
);

// Select error state
export const selectEnumsError = createSelector(
  selectEnumsState,
  (state: EnumsState) => state.error
); 