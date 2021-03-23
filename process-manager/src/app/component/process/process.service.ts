import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICommentDTO} from '../../dto/ICommentDTO';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  URL = 'http://localhost:8080';

  httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }


  getListProcess(page: number): Observable<any> {
    return this.http.get(this.URL + '/process-list?page=' + page);
  }

  getProcessDetail(idProcessDetail: number) {
    return this.http.get(this.URL + '/process-detail/' + idProcessDetail);
  }

  getListComment(idProcessDetail: number, page: number): Observable<any> {
    return this.http.get<ICommentDTO[]>(this.URL + '/appreciate-list/' + idProcessDetail + '/?page=' + page);
  }

  getRepCommentList(idComment: number) {
    return this.http.get(this.URL + '/rep-comment-list/' + idComment);
  }

  teacherAppreciate(value: any) {
    return this.http.post(this.URL + '/appreciate', value, this.httpOptions);
  }

  getProcessDetailByGroupId(id: any): Observable<any> {
    return this.http.get(this.URL + '/process-by-group/' + id);
  }

  editAppreciate(value: any) {
    return this.http.post(this.URL + '/edit-appreciate', value, this.httpOptions);
  }

  deleteAppreciate(value: any) {
    return this.http.post(this.URL + '/delete-appreciate', value, this.httpOptions);
  }

  replyAppreciate(value: any) {
    return this.http.post(this.URL + '/reply-appreciate', value, this.httpOptions);
  }

  registerTopic(value: any) {
    return this.http.post(this.URL + '/register-topic', value, this.httpOptions);
  }

  getListInfoTopicRegister(id: number): Observable<any> {
    return this.http.get((this.URL + '/get-topic-not-approval?id=' + id));
  }

  approval(infoTopicWantApproval: any) {
    return this.http.post(this.URL + '/approval' , infoTopicWantApproval, this.httpOptions);
  }
}
