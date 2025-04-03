import { createReducer, on } from '@ngrx/store';
import { 
  loginSuccess, loginFailure,
  refreshTokenSuccess, refreshTokenFailure,
  getAuthenticationMethodSuccess, getAuthenticationMethodFailure,
  getOidcConfigurationsSuccess, getOidcConfigurationsFailure,
  setOidcConfigurationsSuccess, setOidcConfigurationsFailure,
  logoutSuccess, logoutFailure
} from 'store/actions/security.actions';

//reducer files defines the reducers that can be performed on the state

export const securityActions = {
    TOKEN : 'TOKEN',
    TOKEN_RECEIVED: 'TOKEN_RECEIVED',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
    GET_OIDC_CONFIGURATIONS:'GET_OIDC_CONFIGURATIONS',
    SET_OIDC_CONFIGURATIONS:'SET_OIDC_CONFIGURATIONS',
    AUTHENTICATION_METHOD:'AUTHENTICATION_METHOD',
    LOGOUT : 'LOGOUT',
    LOGOUT_SUCCESS : 'LOGOUT_SUCCESS'
};

export interface SecurityState {
  user: any;
  token: string | null;
  error: any;
  loading: boolean;
  authenticationMethod: string | null;
  oidcConfigurations: any | null;
}

const initialState: SecurityState = {
  user: null,
  token: null,
  error: null,
  loading: false,
  authenticationMethod: null,
  oidcConfigurations: null
};

export const securityReducer = createReducer(
  initialState,
  
  // Login actions
  on(loginSuccess, (state, { token }) => ({ 
    ...state, 
    token,
    error: null,
    loading: false
  })),
  on(loginFailure, (state, { error }) => ({ 
    ...state, 
    error,
    loading: false
  })),
  
  // Refresh token actions
  on(refreshTokenSuccess, (state, { token }) => ({ 
    ...state, 
    token,
    error: null,
    loading: false
  })),
  on(refreshTokenFailure, (state, { error }) => ({ 
    ...state, 
    error,
    loading: false
  })),
  
  // Authentication method actions
  on(getAuthenticationMethodSuccess, (state, { method }) => ({ 
    ...state, 
    authenticationMethod: method,
    error: null,
    loading: false
  })),
  on(getAuthenticationMethodFailure, (state, { error }) => ({ 
    ...state, 
    error,
    loading: false
  })),
  
  // OIDC configurations actions
  on(getOidcConfigurationsSuccess, (state, { configurations }) => ({ 
    ...state, 
    oidcConfigurations: configurations,
    error: null,
    loading: false
  })),
  on(getOidcConfigurationsFailure, (state, { error }) => ({ 
    ...state, 
    error,
    loading: false
  })),
  
  // Set OIDC configurations actions
  on(setOidcConfigurationsSuccess, (state) => ({ 
    ...state, 
    error: null,
    loading: false
  })),
  on(setOidcConfigurationsFailure, (state, { error }) => ({ 
    ...state, 
    error,
    loading: false
  })),
  
  // Logout actions
  on(logoutSuccess, (state) => ({ 
    ...state, 
    user: null,
    token: null,
    error: null,
    loading: false
  })),
  on(logoutFailure, (state, { error }) => ({ 
    ...state, 
    error,
    loading: false
  }))
);