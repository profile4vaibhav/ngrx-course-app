import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Course } from '../../model/course.model';
import { CourseService } from '../../services/course.service';
import { AppState } from '../../../store/reducers/index';
import { getAllCourses } from '../../store/course.selectors';
import { courseActionTypes } from '../../store/course.actions';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  public courses$: Observable<Course[]>;
  public courseToBeUpdated: Course;
  public isUpdateActivated: boolean;

  constructor(
    private _courseService: CourseService,
    private _store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.courses$ = this._store.select(getAllCourses);
  }

  deleteCourse(courseId: string) {
    this._store.dispatch(courseActionTypes.deleteCourse({ courseId }));
  }

  showupdateForm(course: Course) {
    this.courseToBeUpdated = {...course};
    this.isUpdateActivated = true;
  }

  updateCourse(updateForm) {
    const update: Update<Course> = {
      id: this.courseToBeUpdated.id,
      changes: {
        ...this.courseToBeUpdated,
        ...updateForm.value
      }
    };

    this._store.dispatch(courseActionTypes.updateCourse({ update }));

    this.isUpdateActivated = false;
    this.courseToBeUpdated = null;
  }

}
