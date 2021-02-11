import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as uuid from 'uuid';

import { Course } from '../../model/course.model';
import { courseActionTypes } from '../../store/course.actions';
import { AppState } from '../../../store/reducers/index';


@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  constructor(
    private _store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  submitForm(submittedForm) {
    console.log(submittedForm.value);

    if(submittedForm.invalid) {
      return;
    }

    const course: Course = {
      id: uuid(),
      name: submittedForm.value.name,
      description: submittedForm.value.description
    };

    this._store.dispatch(courseActionTypes.createCourse({ course }));
  }

}
