import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

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

  getAllNotification(id: any): Observable<any> {
    return this.http.get(this.URL + '/notification/'+ id);
  }

  seenNotification(id: any) {
    return this.http.get(this.URL + '/seen-notification/'+ id);
  }

  // public notification(notification: any) {
  //   this.socket.emit('new-notification', notification)
  // }
  //
  //
  // public getNotification = () => {
  //   return new Observable(subscriber => {
  //     this.socket.on('new-notification', (notification) => {
  //       subscriber.next(notification);
  //     })
  //   });
  // }
}
