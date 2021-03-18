import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IReport} from '../../entity/IReport';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = 'http://localhost:8080/api/public';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'};
  constructor(
    private http: HttpClient
  ) {}
  checkCreateReport(id): Observable<any>{
    return this.http.get(this.url + '/CheckCreateReport/' + id);
  }

  createReport(report: IReport): Observable<any>{
    // @ts-ignore
    return this.http.post(this.url + '/CreateReport/' + report);
  }
}
