import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SubjectService } from '../subject/subject.service'
import { Subject } from '../../../models/admin/Subject'

@Injectable({
  providedIn: 'root'
})
export class AdminSubjectResolverService implements Resolve<Subject[]> {

  constructor(private subjectService: SubjectService) { }

  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<Subject[]> {
    return this.subjectService.getSubject();
  }
}
