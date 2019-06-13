import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../../../models/admin/Subject';
import { Topic } from '../../../models/admin/Topic';
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
export class SubjectService {
  subjectId;
  url:string = globalVar.baseUrl;
  req: any;

  constructor(private http: HttpClient) { }
  
  getSubject():Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url + '/subjects', httpOptions);
  }

  getSubjectById(subjectId){
    return this.http.get<Subject>(this.url + '/subjects/' + subjectId, httpOptions)
  }

  addSubject(req) {
    return this.http.post(this.url + '/subjects', req, httpOptions);
  }

  getTopics(subjectId):Observable<Topic[]> {
    this.subjectId = subjectId
    return this.http.get<Topic[]>(this.url + '/subjects/' + subjectId + '/topics', httpOptions);
  }

  addTopic(topic: Topic) {
    console.log(topic)
    return this.http.post(this.url + '/subjects/' + this.subjectId + '/topics', topic, httpOptions);
  }
  
  updateTopic(topicNum, desc, topicId){
    const topicDesc = {
      topicNumber : topicNum,
      description : desc
    }
    return this.http.put(this.url + '/subjects/' + this.subjectId + '/topics/' + topicId, topicDesc, httpOptions);
  }

  deleteTopic(subjectId, topicId){
    return this.http.post(this.url + '/subjects/' + subjectId + '/topics/' + topicId + '/archive', {}, httpOptions);
  }

  getSubjectEnrollees():Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url + '/subjects/enrollees/count', httpOptions);
  }

  // lesson api
  getLesson(topicId){
    return this.http.get(this.url + '/subjects/topics/' + topicId + '/lessons', httpOptions)
  }

  addLesson(topicId, req){
    return this.http.post(this.url + '/subjects/topics/' + topicId + '/lessons', req, httpOptions)
  }

  updateLesson(topicId, lessonId, desc, num){
    let req = {
      "description": desc,
      "lessonNumber": num,
      "isArchive": false
  }
    return this.http.put(this.url + '/subjects/topics/' + topicId + '/lessons/' + lessonId, req, httpOptions)
  }

  deleteLesson(topicId, lessonId){
    return this.http.delete(this.url + '/subjects/topics/' + topicId + '/lessons/' + lessonId, httpOptions )
  }

  generateSubjectCode(subjects) {
    return this.http.post(this.url + '/admin/subjects/codes/generate', subjects, httpOptions )
  }

  sendSubjectCode(input, email){
    let req = {
      "subjectCode": input,
      "email": email
    }
    console.log(req)
    return this.http.post(this.url + '/admin/subjects/codes/send', req, httpOptions)
  }
}
