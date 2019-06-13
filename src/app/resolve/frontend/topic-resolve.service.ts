
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router"; 
import { showNotif } from '../../../assets/js/loader.js';
import { TopicService } from '../../services/frontend/topic/topic.service';
 
@Injectable()
export class TopicResolve implements Resolve<any> {
 constructor(private  dataservice: TopicService, private route: ActivatedRoute, private router: Router){}
 resolve(route:ActivatedRouteSnapshot,  state:RouterStateSnapshot): Observable<any> {
    return this.dataservice.getTopicsPerSubject("5c90a53243b48e0017c65465").pipe(
      
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        this.router.navigate(['/login']);
        // showNotif("Please login first", "danger");  
        return of({ error: message });
      })
    );
  }
}