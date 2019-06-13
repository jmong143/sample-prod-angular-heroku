import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthFrontEnd } from '../../../models/frontend/AuthFrontEnd';
import { RegistrationFrontEnd } from '../../../models/frontend/RegistrationFrontEnd';
import * as globalVar from '../../../app-global'; 

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
export class UserService {
  userSession: boolean = false;
  constructor(private http: HttpClient, private router: Router) {

  }

  validateSession(){
    if (localStorage.getItem("pinnacleUser") === null) {
      this.router.navigate(['/login']);
    }else{
      return this.http.get(`${globalVar.baseUrl}/auth/sessions/validate`, httpOptions).subscribe(
        res => {
          console.log(">>> " + JSON.stringify(res))
        },
        err => {
          console.log(">>> " + JSON.stringify(err))
          // localStorage.removeItem('pinnacleUser');
          // this.router.navigate(['/login']);
        }
      );    
    }
  
  }

  getProfile(){
    if (localStorage.getItem("pinnacleUser") === null) {
      this.router.navigate(['/login']);
    }else{
      const headersGetProfile = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-client-id': 'Jeyk',
          'x-client-secret': 'Qwe12345',
          'token': localStorage.getItem("pinnacleUser")
        })
      }
      return this.http.get(`${globalVar.baseUrl}/profile`, headersGetProfile);  
    }
  
  }

  // loginUser(auth: AuthFrontEnd, data):Observable<any>{
    loginUser(auth: AuthFrontEnd, data) {
      const httpOptionsLogin = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-client-id': 'Jeyk',
          'x-client-secret': 'Qwe12345'
        })
      }
      return this.http.post(`${globalVar.baseUrl}/auth/login`, data, httpOptionsLogin)
    }

  createUser(auth: RegistrationFrontEnd, data):Observable<any>{
    const httpOptionsRegister = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-client-id': 'Jeyk',
        'x-client-secret': 'Qwe12345'
      })
    }
    return this.http.post<RegistrationFrontEnd>(`${globalVar.baseUrl}/auth/register`, data, httpOptionsRegister)
  }

  resetPassword(auth: AuthFrontEnd, data):Observable<any>{
    return this.http.post<AuthFrontEnd>(`${globalVar.baseUrl}/auth/password/reset`, data, httpOptions)
  }

  updatePassword(auth: AuthFrontEnd, data):Observable<any>{
    const urlParams = new URLSearchParams(window.location.search);
    const tokenExpire = urlParams.get('expire'); 
    const newHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-client-id': 'Jeyk',
        'x-client-secret': 'Qwe12345',
        'token': tokenExpire
      })
    }
    console.log("headerss>>> " + JSON.stringify(httpOptions))
    return this.http.post<AuthFrontEnd>(`${globalVar.baseUrl}/auth/password/update`, data, newHttpOptions)
  }

  
}
