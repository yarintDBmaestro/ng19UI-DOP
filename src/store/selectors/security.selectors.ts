import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SecurityState } from '../reducers/security.reducer';

// Select the security feature state
export const selectSecurityState = createFeatureSelector<SecurityState>('security');

// Select user
export const selectUser = createSelector(
  selectSecurityState,
  (state: SecurityState) => state.user
);

// Select token
export const selectToken = createSelector(
  selectSecurityState,
  (state: SecurityState) => state.token
);

// Select error
export const selectError = createSelector(
  selectSecurityState,
  (state: SecurityState) => state.error
);

// Select loading state
export const selectLoading = createSelector(
  selectSecurityState,
  (state: SecurityState) => state.loading
);

// Select authentication method
export const selectAuthenticationMethod = createSelector(
  selectSecurityState,
  (state: SecurityState) => state.authenticationMethod
);

// Select OIDC configurations
export const selectOidcConfigurations = createSelector(
  selectSecurityState,
  (state: SecurityState) => state.oidcConfigurations
);

// Select is authenticated
export const selectIsAuthenticated = createSelector(
  selectToken,
  (token: string | null) => !!token
); 