import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../../../models/admin/Users';
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
export class UserService {

  url:string = globalVar.baseUrl;
  req: any;

  constructor(private http: HttpClient) { }
  
  getUser():Observable<Users> {
    return this.http.get<Users>(this.url + '/users', httpOptions);
  }

  getUserByKeyword(query):Observable<Users> {
    return this.http.get<Users>(this.url + '/users?keyword=' + query, httpOptions);
  }

  addUser(userData: Users) {
    return this.http.post(this.url + '/users', userData, httpOptions);
  }

  getUserDetails(userId):Observable<Users[]> {
    return this.http.get<Users[]>(this.url + '/users/' + userId, httpOptions);
    
  }

  getProfile():Observable<Users[]> {
    return this.http.get<Users[]>(this.url + '/profile', httpOptions);
  }
}
