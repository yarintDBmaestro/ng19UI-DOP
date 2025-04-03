import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { api } from '@src/constants/api';
import {
  getDbTypeFlags,
  getDbTypeFlagsSuccess,
  getDbTypeFlagsFailure,
  getDbTypeImage,
  getDbTypeImageSuccess,
  getDbTypeImageFailure
} from '../actions/project.actions';

@Injectable()
export class ProjectEffects {
  private restServiceUrl: string = api.restServiceUrl;

  // Get DB Type Flags
  getDbTypeFlags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDbTypeFlags),
      mergeMap(({ dbTypeId }) =>
        this.http.get(`${this.restServiceUrl}Projects/DBTypeFlags/${dbTypeId}`).pipe(
          map(response => getDbTypeFlagsSuccess({ dbTypeId, flags: response })),
          catchError(error => of(getDbTypeFlagsFailure({ error })))
        )
      )
    )
  );

  // Get DB Type Image
  getDbTypeImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDbTypeImage),
      mergeMap(({ dbTypeId }) =>
        this.http.get(`${this.restServiceUrl}Projects/DBTypeImage/${dbTypeId}`).pipe(
          map(response => getDbTypeImageSuccess({ dbTypeId, image: response })),
          catchError(error => of(getDbTypeImageFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
} 