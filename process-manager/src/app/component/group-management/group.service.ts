import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IStudent, IStudent1} from "../../entity/IStudent";

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

  deleteGroup(groupId: number, listIdStudent: number[]) {
    return this.http.post(this.API + 'delete-group/' + groupId, listIdStudent);
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

  createGroup(nameGroup: string, listStudentAdded: IStudent[], id: number) {
    return this.http.post(this.API + 'create-group/' + nameGroup + '/' + id, listStudentAdded)
  }

  createGroupAndLeader(nameGroup: string, listStudentAdded: IStudent[], accountId: number) {
    return this.http.post(this.API + 'create-group-leader/' + nameGroup + '/' + accountId, listStudentAdded)
  }

  getAll(){
    return this.http.get(this.API + 'getAllGroupAccount')
  }

  checkJoinGroup(id: number) {
    return this.http.get(this.API + 'check-join-group/' + id)
  }

  acceptJoinGroup(id: any) {
    return this.http.get(this.API + 'accept-join-group/'+ id)
  }

  denyGroup(id: any) {
    return this.http.get(this.API + 'deny-join-group/'+ id)
  }
}
