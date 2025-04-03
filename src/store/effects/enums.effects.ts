import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { api } from 'constants/api';
import {
  loadDeployModeTypes,
  loadSourceControlPathTypes,
  loadConflictResolveActionTypes,
  loadContinuousIntegrationTypes,
  loadDuplicationActionTypes,
  loadFileVersionControlTypes,
  loadDbTypes,
  loadDeployModeTypesSuccess,
  loadSourceControlPathTypesSuccess,
  loadConflictResolveActionTypesSuccess,
  loadContinuousIntegrationTypesSuccess,
  loadDuplicationActionTypesSuccess,
  loadFileVersionControlTypesSuccess,
  loadDbTypesSuccess,
  loadEnumsFailure
} from '../actions/enums.actions';

@Injectable()
export class EnumsEffects {
  private restServiceUrl: string = api.restServiceUrl;

  // Deploy Mode Types
  loadDeployModeTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDeployModeTypes),
      mergeMap(() =>
        this.http.get<any>(`${this.restServiceUrl}Projects/Enums/DeployModeTypes`).pipe(
          map(response => loadDeployModeTypesSuccess({ deployModeTypes: response.data })),
          catchError(error => of(loadEnumsFailure({ error })))
        )
      )
    )
  );

  // Source Control Path Types
  loadSourceControlPathTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSourceControlPathTypes),
      mergeMap(() =>
        this.http.get<any>(`${this.restServiceUrl}Projects/Enums/SourceControlPathTypes`).pipe(
          map(response => loadSourceControlPathTypesSuccess({ sourceControlPathTypes: response.data })),
          catchError(error => of(loadEnumsFailure({ error })))
        )
      )
    )
  );

  // Conflict Resolve Action Types
  loadConflictResolveActionTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConflictResolveActionTypes),
      mergeMap(() =>
        this.http.get<any>(`${this.restServiceUrl}Projects/Enums/ConflictResloveActionTypes`).pipe(
          map(response => loadConflictResolveActionTypesSuccess({ conflictResolveActionTypes: response.data })),
          catchError(error => of(loadEnumsFailure({ error })))
        )
      )
    )
  );

  // Continuous Integration Types
  loadContinuousIntegrationTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadContinuousIntegrationTypes),
      mergeMap(() =>
        this.http.get<any>(`${this.restServiceUrl}Projects/Enums/ContinuousIntegrationTypes`).pipe(
          map(response => loadContinuousIntegrationTypesSuccess({ continuousIntegrationTypes: response.data })),
          catchError(error => of(loadEnumsFailure({ error })))
        )
      )
    )
  );

  // Duplication Action Types
  loadDuplicationActionTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDuplicationActionTypes),
      mergeMap(() =>
        this.http.get<any>(`${this.restServiceUrl}Projects/Enums/DuplicationActionTypes`).pipe(
          map(response => loadDuplicationActionTypesSuccess({ duplicationActionTypes: response.data })),
          catchError(error => of(loadEnumsFailure({ error })))
        )
      )
    )
  );

  // File Version Control Types
  loadFileVersionControlTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFileVersionControlTypes),
      mergeMap(() =>
        this.http.get<any>(`${this.restServiceUrl}Projects/Enums/FileVersionControlTypes`).pipe(
          map(response => loadFileVersionControlTypesSuccess({ fileVersionControlTypes: response.data })),
          catchError(error => of(loadEnumsFailure({ error })))
        )
      )
    )
  );

  // DB Types
  loadDbTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDbTypes),
      mergeMap(() =>
        this.http.get<any>(`${this.restServiceUrl}Projects/DBTypes`).pipe(
          map(response => loadDbTypesSuccess({ dbTypes: response.data })),
          catchError(error => of(loadEnumsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
} 