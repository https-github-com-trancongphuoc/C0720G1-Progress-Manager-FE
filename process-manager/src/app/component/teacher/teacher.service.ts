import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITeacher} from '../../entity/ITeacher';
import {IDegree} from '../../entity/IDegree';
import {IStudent} from '../../entity/IStudent';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  public API: string = 'http://localhost:8081/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(private http: HttpClient) {
  }

  getAllStudent(find: string, page: number): Observable<any> {
    return this.http.get<any>(this.API + '/teacher-list?find='+find + '&page=' + page);
  }

  createTeacher(any): Observable<any>{
    return this.http.post<any>(this.API + "/create-teacher", JSON.stringify(any), this.httpOptions)
  }

  getAllDegree(): Observable<IDegree[]>{
    return this.http.get<IDegree[]>(this.API + '/get-all-degree');
  }

  deleteTeacher(id:number): Observable<any>{
    return this.http.delete<any>(this.API + "/delete-teacher/" + id, this.httpOptions)
  }
}
