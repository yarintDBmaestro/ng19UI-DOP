import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { api } from 'constants/api';
import { 
  login, loginSuccess, loginFailure,
  refreshToken, refreshTokenSuccess, refreshTokenFailure,
  getAuthenticationMethod, getAuthenticationMethodSuccess, getAuthenticationMethodFailure,
  getOidcConfigurations, getOidcConfigurationsSuccess, getOidcConfigurationsFailure,
  setOidcConfigurations, setOidcConfigurationsSuccess, setOidcConfigurationsFailure,
  logout, logoutSuccess, logoutFailure
} from '../actions/security.actions';

@Injectable()
export class SecurityEffects {
  private restServiceUrl: string = api.restServiceUrl;

  // Login effect
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((action) => {
        const formData = new URLSearchParams();
        formData.append('grant_type', 'password');
        formData.append('username', action.username);
        formData.append('password', action.password);
        formData.append('authType', action.authType);

        return this.http.post(`${this.restServiceUrl}Security/Token`, formData.toString(), {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
          })
        }).pipe(
          map((response: any) => loginSuccess({ token: response.data.access_token })),
          catchError(error => of(loginFailure({ error })))
        );
      })
    )
  );

  // Refresh token effect
  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshToken),
      mergeMap((action) => 
        this.http.post<{access_token: string}>(`${this.restServiceUrl}Security/RefreshToken`, action).pipe(
          map(response => refreshTokenSuccess({ token: response.access_token })), // was response['access_token']
          catchError(error => of(refreshTokenFailure({ error })))
        )
      )
    )
  );

  // Get authentication method effect
  getAuthenticationMethod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAuthenticationMethod),
      mergeMap(() => 
        this.http.get<any>(`${this.restServiceUrl}Security/AuthenticationMethod`).pipe(
          /* edited */
          map(response => getAuthenticationMethodSuccess({ method: response.data.authenticationMethod })),
          catchError(error => of(getAuthenticationMethodFailure({ error })))
        )
      )
    )
  );

  // Get OIDC configurations effect
  getOidcConfigurations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOidcConfigurations),
      mergeMap(() => 
        this.http.get(`${this.restServiceUrl}Security/OidcConfigurations`).pipe(
          map(response => getOidcConfigurationsSuccess({ configurations: response })),
          catchError(error => of(getOidcConfigurationsFailure({ error })))
        )
      )
    )
  );

  // Set OIDC configurations effect
  setOidcConfigurations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setOidcConfigurations),
      mergeMap((action) => 
        this.http.post(
          `${this.restServiceUrl}Security/OidcConfigurations?reloadServices=${action.flag}`, 
          action.configData
        ).pipe(
          map(() => setOidcConfigurationsSuccess()),
          catchError(error => of(setOidcConfigurationsFailure({ error })))
        )
      )
    )
  );

  // Logout effect
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap((action) => {
        if (action.callback) {
          action.callback();
        }
      }),
      map(() => logoutSuccess())
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
} 