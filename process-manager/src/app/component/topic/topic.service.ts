import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ITopic} from "../../entity/ITopic";
import {IInfoTopicRegister} from "../../entity/IInfoTopicRegister";
import {IComment} from "../../entity/IComment";
import {IGroupAccount} from "../../entity/IGroupAccount";

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,PATCH'
  };
  private apiTopicUrl = 'http://localhost:8080/api/public/topic-manager/';

  constructor(private httpClient: HttpClient) {
  }

  getAllTopicFind(name: string, page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(this.apiTopicUrl + 'topic-search?name=' + name + '&page=' + page + '&size=' + size, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  findByIdTopic(id): Observable<ITopic> {
    return this.httpClient.get<ITopic>(this.apiTopicUrl + 'findById/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getDelete(comment): Observable<IInfoTopicRegister> {
    return this.httpClient.post<IInfoTopicRegister>(this.apiTopicUrl + 'cancel-topic', comment, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getDeadline(groupAccount): Observable<any> {
    return this.httpClient.post<any>(this.apiTopicUrl + 'update-deadline', groupAccount, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createTopicProcess(topicProcess) : Observable<any>{
    return this.httpClient.post<any>(this.apiTopicUrl + 'create-process', topicProcess,this.httpOptions)
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
