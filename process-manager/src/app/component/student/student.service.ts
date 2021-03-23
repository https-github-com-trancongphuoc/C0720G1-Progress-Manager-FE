import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IStudent} from '../../entity/IStudent';
import {IGrade} from '../../entity/IGrade';
import {IFaculty} from '../../entity/IFaculty';


import {IReport} from '../../entity/IReport';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public API: string = 'http://localhost:8080/api';
  private url = 'http://localhost:8080/api/public/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * TinVT
   * Get List Student
   *
   */
  getAllStudent(find: string, page: number): Observable<any> {
    return this.http.get<any>(this.API + '/student-list?find=' + find + '&page=' + page);
  }

  /**
   * TinVT
   * Find all Grade
   */
  getAllGrade(): Observable<IGrade[]> {
    return this.http.get<IGrade[]>(this.API + '/get-all-grade');
  }

  /**
   * TinVT
   * Find all Faculty
   */
  getAllFaculty(): Observable<IFaculty[]> {
    return this.http.get<IFaculty[]>(this.API + '/get-all-faculty');
  }

  /**
   * TinVT
   * Add New Student
   */
  createStudent(any): Observable<any>{
    return this.http.post<any>(this.API + "/create-student", JSON.stringify(any), this.httpOptions)
  }

  /**
   * TinVT
   * Delete Student
   */
  deleteStudent(id:number): Observable<any>{
    return this.http.delete<any>(this.API + "/delete-student/" + id, this.httpOptions)
  }

  /**
   * TinVT
   * findById Student
   */
  findStudentById(id: number): Observable<IStudent>{
    return this.http.get<IStudent>(this.API + "/get-Student-by-id/"+ id);
  }

  createReport(report): Observable<IReport>{
    return this.http.post<IReport>(this.url + "CreateReport", report);
  }
  checkCreateReport(id): Observable<any>{
    return this.http.get(this.url + 'CheckCreateReport/' + id);
  }
}
