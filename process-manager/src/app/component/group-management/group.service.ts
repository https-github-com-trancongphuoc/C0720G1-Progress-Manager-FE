import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  public API = 'http://localhost:8080/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(
    public http: HttpClient
  ) {
  }

  getListStudent(page: number): Observable<any> {
    return this.http.get(this.API + 'list-student?page=' + page);
  }

  searchStudent(searchName: any, page: number) {
    return this.http.get(this.API + 'search-student/' + searchName + '?page=' + page);
  }

  getListGroup(page: number) {
    return this.http.get(this.API + 'list-group?page=' + page);
  }

  deleteGroup(groupId: number) {
    return this.http.delete(this.API + 'delete-group/' + groupId);
  }

  getListStudentByIdGroup(id: number): Observable<any> {
    return this.http.get(this.API + 'student-group/' + id);
  }

  deleteStudentGroup(id: number) {
    return this.http.delete(this.API + 'delete-student-group/' + id);
  }

  acceptGroup(id: number) {
    return this.http.get(this.API + 'accept-group/' + id);
  }

  searchGroup(searchName: string, page: number) {
    return this.http.get(this.API + 'search-group/' + searchName + '?page=' + page);
  }
}
