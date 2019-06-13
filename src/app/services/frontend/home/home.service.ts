import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthFrontEnd } from '../../../models/frontend/AuthFrontEnd';
import * as globalVar from '../../../app-global'; 
import { showNotif } from '../../../../assets/js/loader.js';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-client-id': 'Jeyk',
    'x-client-secret': 'Qwe12345',
    'token': localStorage.getItem("pinnacleUser")
  })
}
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private router: Router) {

  }
  getHomeService11(auth: AuthFrontEnd, data):Observable<any>{
    return this.http.get(`${globalVar.baseUrl}/home`, httpOptions)
  }

  getHomeService(){
    const headersHome = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-client-id': 'Jeyk',
        'x-client-secret': 'Qwe12345',
        'token': localStorage.getItem("pinnacleUser")
      })
    }
    return this.http.get(`${globalVar.baseUrl}/home`, headersHome)
  }


}
