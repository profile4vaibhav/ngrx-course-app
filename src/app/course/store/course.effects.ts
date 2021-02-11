import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, map, tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { CourseService } from '../services/course.service';
import { courseActionTypes, coursesLoaded, updateCourse } from './course.actions';

@Injectable()
export class CourseEffects {

  constructor(
    private _courseService: CourseService,
    private _actions$: Actions,
    private _router: Router,
  ) {}

  loadCourses$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActionTypes.loadCourses),
      concatMap(() => this._courseService.getAllCourses()),
      map(courses => courseActionTypes.coursesLoaded({ courses }))
    )
  );

  createCourse$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActionTypes.createCourse),
      concatMap((action) => this._courseService.createCourse(action.course)),
      tap(() => this._router.navigateByUrl('/courses'))
    ),
    { dispatch: false }
  );

  deleteCourse$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActionTypes.deleteCourse),
      concatMap((action) => this._courseService.deleteCourse(action.courseId))
    ),
    { dispatch: false }
  );

  updateCourse$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActionTypes.updateCourse),
      concatMap((action) => this._courseService.updateCourse(action.update.id, action.update.changes))
    ),
    { dispatch: false }
  )

}

