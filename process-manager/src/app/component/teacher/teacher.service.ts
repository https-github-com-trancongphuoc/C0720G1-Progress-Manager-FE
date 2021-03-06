import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IDegree} from '../../entity/IDegree';
import {IStudentEdit} from "../../entity/IStudent";
import {ITeacherEditDTO} from "../../entity/ITeacher";


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  public API: string = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(private http: HttpClient) {
  }

  getAllTeacher(find: string, page: number): Observable<any> {
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

  editTeacher(any): Observable<any>{
    return this.http.put<any>(this.API + "/update-teacher", JSON.stringify(any), this.httpOptions);
  }

  findTeacherById(id: number): Observable<ITeacherEditDTO>{
    return this.http.get<ITeacherEditDTO>(this.API + "/get-teacher-by-id/"+ id);
  }
}
