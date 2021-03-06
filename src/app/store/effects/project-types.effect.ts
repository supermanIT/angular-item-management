import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import * as ProjectTypesActions from '@store/actions/project-types.actions';
import { environment } from 'environments/environment';
import { IField } from '@app/models/field.model';
import { IProjectType } from '@app/models/project-type.model';

@Injectable()
export class ProjectTypesEffects {
  constructor(private http: HttpClient, private action$: Actions) {}

  GetProjectTypes$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ProjectTypesActions.GetProjectTypesAction),
      mergeMap(action =>
        this.http.get(`${environment.apiUrl}/project-type`).pipe(
          map((types: IField[]) => {
            return ProjectTypesActions.ProjecctTypesLoadedAction({ payload: types });
          }),
          catchError((error: Error) => {
            return of(ProjectTypesActions.ErrorProjectTypesAction(error));
          })
        )
      ),
      take(1)
    )
  );
  CreateProject$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(ProjectTypesActions.BeginCreateProjectTypeAction),
    mergeMap(action =>
      this.http.post(`${environment.apiUrl}/project-type`, action.payload).pipe(
        map((projectType: IProjectType[]) => {
          return ProjectTypesActions.SuccessCreateProjectTypeAction({ payload: projectType });
        }),
        catchError((error: Error) => {
          return of(ProjectTypesActions.ErrorProjectTypesAction(error));
        })
      )
    )
  ),
);
}

