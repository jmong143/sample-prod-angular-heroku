import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as globalVar from '../../../app-global'
import { DailyTip } from '../../../models/admin/DailyTip';

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
export class DailyTipService {
  url:string = globalVar.baseUrl;
  req: any;

  constructor(private http: HttpClient) { }

  getDailyTip():Observable<DailyTip[]> {
    return this.http.get<DailyTip[]>(this.url + '/tips', httpOptions);
  }

  addDailyTip(req) {
    return this.http.post(this.url + '/tips', req, httpOptions)
  }

  updateDailyTip(req, id){
    let request = {
      "tip" : req,
      "isArchive" : false
    }
    return this.http.put(this.url + '/tips/' + id, request, httpOptions)
  }

  deleteDailyTip(id){
    return this.http.delete(this.url + '/tips/' + id, httpOptions)
  }
}
