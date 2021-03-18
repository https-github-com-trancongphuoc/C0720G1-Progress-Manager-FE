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


  getListProcess() {
    return this.http.get(this.URL + '/process-list');
  }

  getProcessDetail(idProcessDetail: number) {
    return this.http.get(this.URL + '/process-detail/' + idProcessDetail);
  }

  getListComment(idProcessDetail: number, page: number): Observable<ICommentDTO[]> {
    return this.http.get<ICommentDTO[]>(this.URL + '/appreciate-list/' + idProcessDetail + '/?page=' + page);
  }

  getRepCommentList(idComment: number) {
    return this.http.get(this.URL + '/rep-comment-list/' + idComment);
  }
}
