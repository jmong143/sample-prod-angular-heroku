import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot, NavigationEnd, RoutesRecognized } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router"; 
import { showNotif } from '../../../assets/js/loader.js';
import { SubjectService } from '../../services/frontend/subject/subject.service';
import { getParameterByName } from '../../../assets/js/urlParams'; 
@Injectable()
export class SubjectInfoResolve implements Resolve<any> {
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;
  private subjecttID: string = undefined;
  private serviceFunction;
  private sampleSubId;
  // constructor(){}
  constructor(private  dataservice: SubjectService, private route: ActivatedRoute, private router: Router) {
    this.currentUrl = this.router.url;
    
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
 
  }
 resolve(route:ActivatedRouteSnapshot,  state:RouterStateSnapshot){
    this.currentUrl = this.router.url;
    return this.dataservice.getSubjectInfoService(route.queryParams.id).pipe(
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        this.router.navigate(['/subjects']);
        // showNotif("Please login first", "danger");  
        return of({ error: message });
      })
    );
  }
}