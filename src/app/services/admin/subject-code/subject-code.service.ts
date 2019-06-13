import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class SubjectCodeService {
  url:string = globalVar.baseUrl;
  dismissed: boolean = true
  viewData: EventEmitter<boolean> = new EventEmitter();
  change: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) { }

  viewSubjectCodes(){
    return this.http.get(this.url + '/admin/subjects/codes', httpOptions)
  }

  showSubjectCodes(){
    this.dismissed = false
    this.change.emit(this.dismissed);
  }
}