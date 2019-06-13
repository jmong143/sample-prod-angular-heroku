import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router"; 
import { showNotif } from '../../../../src/assets/js/loader.js';
import { HomeService } from '../../services/frontend/home/home.service';
 
@Injectable()
export class HomeResolve implements Resolve<any> {
 constructor(private  dataservice: HomeService, private route: ActivatedRoute, private router: Router){}
 resolve(route:ActivatedRouteSnapshot,  state:RouterStateSnapshot): Observable<any> {
    return this.dataservice.getHomeService().pipe(
      
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