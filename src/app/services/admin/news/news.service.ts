import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../../../models/admin/News'
import * as globalVar from '../../../app-global'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'token': JSON.parse(localStorage.getItem('currentAdmin')),
    'x-client-id': 'Jeyk',
    'x-client-secret' : 'Qwe12345',
  })
}

@Injectable({
  providedIn: 'root'
})

export class AdminNewsService {
  url:string = globalVar.baseUrl;
  req: any;
  constructor(private http: HttpClient) { }

  getNews():Observable<News[]> {
    return this.http.get<News[]>(this.url + '/news', httpOptions)
  }

  getNewsById(id):Observable<News[]> {
    return this.http.get<News[]>(this.url + '/news/' + id, httpOptions)
  }

  addNews(title, description){
    const requestBody = {
      "title" : title,
      "description" : description
    }
    return this.http.post(this.url + '/news', requestBody, httpOptions)
  }

  updateNews(id, title, description){
    const requestBody = {
      "title" : title,
      "description" : description,
      "isArchive": false
    }
    return this.http.put(this.url + '/news/' + id, requestBody, httpOptions)
  }

  archiveNews(id) {
    return this.http.delete(this.url + '/news/' + id, httpOptions)
  }
}
