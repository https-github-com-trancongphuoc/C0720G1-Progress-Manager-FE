import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {IComment} from "../../entity/IComment";
import {catchError} from "rxjs/operators";
import {IStudent} from "../../entity/IStudent";
import {ITeacher} from "../../entity/ITeacher";

@Injectable({
  providedIn: 'root'
})
export class AddNewService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,PATCH'
  };
  private apiStudentAndTeacherUrl = 'http://localhost:8080/api/public/teacher-student/';

  constructor(private httpClient: HttpClient) {
  }

  createStudent(student): Observable<IStudent> {
    return this.httpClient.post<IStudent>(this.apiStudentAndTeacherUrl + 'create-student', student, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createTeacher(teacher): Observable<ITeacher> {
    return this.httpClient.post<ITeacher>(this.apiStudentAndTeacherUrl + 'create-teacher', teacher, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
