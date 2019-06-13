import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router : Router
    ) {}

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
            // auto logout if 401 response returned from api
            // this.authService.logout();
            // location.reload(true);
            localStorage.clear();
            this.router.navigate(['login'])
            console.log(err)
        }             
            const error = err.error.message || err.statusText;
            console.log(error)
            return throwError(error);

            
        }))
    }
}