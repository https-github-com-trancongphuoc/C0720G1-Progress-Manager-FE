import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ITopic} from "../../entity/ITopic";

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

  getAllTopicSize(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(this.apiTopicUrl + 'topic?page=' + page + '&size=' + size, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
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
