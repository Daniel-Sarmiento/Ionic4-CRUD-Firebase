import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  URLSEND: string = 'https://fcm.googleapis.com/fcm/send';
  URLSUBSCRIBETOPIC: string = 'https://iid.googleapis.com/iid/v1:batchAdd';
 

  constructor(
    private http: HttpClient
  ) { 

  }

  subscribeTopic(token: string): Observable<any> { 
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'key=AAAAwbXyfnk:APA91bHl4igw2KpXyWWXCKty-00JPXkIvO9wY3hNOwW35GsQz7d9xFkqqDGtizNdS5eDscMh9MZX_dNxcDU9Qk4Zr1TH4s-KbNHXMBhClW_UUzQUeOQcJkHgj_8q5ybPP_D1uc7LAyuu'
      })
    };

    const data = {
      to: "/topics/pokemon",
      registration_tokens: [token]
    }

    return this.http.post(this.URLSUBSCRIBETOPIC, data, headers)
  }

  sendNotification(idSender): Observable<any> {
    console.log('(3)the idSender is',idSender);
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'key=AAAAwbXyfnk:APA91bHl4igw2KpXyWWXCKty-00JPXkIvO9wY3hNOwW35GsQz7d9xFkqqDGtizNdS5eDscMh9MZX_dNxcDU9Qk4Zr1TH4s-KbNHXMBhClW_UUzQUeOQcJkHgj_8q5ybPP_D1uc7LAyuu'
      })
    };

    const data = {
      data: {
        title: "Pokemon creado",
        message: "Se ha creado un nuevo pokemon",
        idSender: idSender
      },
      to: "/topics/pokemon"
    }

    return this.http.post(this.URLSEND, data, headers)
  }
}
