import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course } from '../model/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseUrl: 'http://localhost:8080';

  constructor(
    private _http: HttpClient
  ) { }

  public getAllCourses(): Observable<Course[]> {
    return this._http.get<Course[]>(`${this.courseUrl}/api/courses`);
  }

  public createCourse(course: Course): Observable<Course> {
    return this._http.post<Course>(`${this.courseUrl}/api/courses`, course);
  }

  public deleteCourse(courseId: string): Observable<any> {
    return this._http.delete(`${this.courseUrl}/api/courses/${courseId}`);
  }

  public updateCourse(courseId: string | number, changes: Partial<Course>): Observable<any> {
    return this._http.put(`${this.courseUrl}/api/courses/${courseId}`, changes);
  }
}
