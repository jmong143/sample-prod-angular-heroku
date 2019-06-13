import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../../../models/admin/Auth';
import { Router } from '@angular/router';
import * as globalVar from '../../../app-global'

const httpOptions = {
  headers: new HttpHeaders({
    'token': JSON.parse(localStorage.getItem('currentAdmin')),
    'Content-Type': 'application/json',
    'x-client-id': 'Jeyk',
    'x-client-secret' : 'Qwe12345',
  })
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authData: any = {}
  url:string = globalVar.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  validate() {
    return this.http.get(this.url + '/auth/admin/sessions/validate', httpOptions)
  }
  
  login(auth: Auth) {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-client-id': 'Jeyk',
      'x-client-secret': 'Qwe12345',
    })
    return this.http.post(this.url + '/auth/admin/login', auth, { headers : header })
  }

  logout() {
    localStorage.removeItem('currentAdmin');
    window.location.href = '/admin-login';
  }
}
