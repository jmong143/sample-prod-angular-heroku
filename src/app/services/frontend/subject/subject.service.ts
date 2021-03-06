import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthFrontEnd } from '../../../models/frontend/AuthFrontEnd';
import * as globalVar from '../../../app-global'; 
import { showNotif } from '../../../../assets/js/loader.js';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private http: HttpClient, private router: Router) {

  }

  getSubjectsService(){
    const headersHome = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-client-id': 'Jeyk',
        'x-client-secret': 'Qwe12345',
        'token': localStorage.getItem("pinnacleUser")
      })
    }
    return this.http.get(`${globalVar.baseUrl}/subjects`, headersHome)
  }
  
  getSubjectInfoService(id){
    const headersHome = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-client-id': 'Jeyk',
        'x-client-secret': 'Qwe12345',
        'token': localStorage.getItem("pinnacleUser")
      })
    }
    return this.http.get(`${globalVar.baseUrl}/subjects/${id}`, headersHome)
  }
}
