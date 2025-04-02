import { createAction, props } from '@ngrx/store';
import { securityActions } from '../reducers/security.reducer';

// Authentication actions
export const login = createAction(
  '[Security] Login',
  props<{ username: string; password: string; authType: string; silentRequest?: boolean }>()
);

export const loginSuccess = createAction(
  '[Security] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Security] Login Failure',
  props<{ error: any }>()
);

// Token actions
export const refreshToken = createAction(
  '[Security] Refresh Token',
  props<{ refreshToken: string }>()
);

export const refreshTokenSuccess = createAction(
  '[Security] Refresh Token Success',
  props<{ token: string }>()
);

export const refreshTokenFailure = createAction(
  '[Security] Refresh Token Failure',
  props<{ error: any }>()
);

// Authentication method actions
export const getAuthenticationMethod = createAction(
  '[Security] Get Authentication Method'
);

export const getAuthenticationMethodSuccess = createAction(
  '[Security] Get Authentication Method Success',
  props<{ method: string }>()
);

export const getAuthenticationMethodFailure = createAction(
  '[Security] Get Authentication Method Failure',
  props<{ error: any }>()
);

// OIDC Configuration actions
export const getOidcConfigurations = createAction(
  '[Security] Get OIDC Configurations'
);

export const getOidcConfigurationsSuccess = createAction(
  '[Security] Get OIDC Configurations Success',
  props<{ configurations: any }>()
);

export const getOidcConfigurationsFailure = createAction(
  '[Security] Get OIDC Configurations Failure',
  props<{ error: any }>()
);

export const setOidcConfigurations = createAction(
  '[Security] Set OIDC Configurations',
  props<{ configData: any; flag: boolean }>()
);

export const setOidcConfigurationsSuccess = createAction(
  '[Security] Set OIDC Configurations Success'
);

export const setOidcConfigurationsFailure = createAction(
  '[Security] Set OIDC Configurations Failure',
  props<{ error: any }>()
);

// Logout actions
export const logout = createAction(
  '[Security] Logout',
  props<{ callback?: () => void }>()
);

export const logoutSuccess = createAction(
  '[Security] Logout Success'
);

export const logoutFailure = createAction(
  '[Security] Logout Failure',
  props<{ error: any }>()
);