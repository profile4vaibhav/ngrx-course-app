import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';

import { AppState } from '../../store/reducers/index';
import { areCoursesLoaded } from '../store/course.selectors';
import { courseActionTypes, coursesLoaded } from '../store/course.actions';

@Injectable()
export class CourseResolver implements Resolve<Observable<any>>{
  constructor(
    private _store: Store<AppState>
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._store.pipe(
      select(areCoursesLoaded),
      tap((coursesLoaded) => {
        if(!coursesLoaded) {
          this._store.dispatch(courseActionTypes.loadCourses())
        }
      }),
      filter(coursesLoaded => coursesLoaded),
      first()
    );
  }
}
