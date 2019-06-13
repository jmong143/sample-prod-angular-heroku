import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ){}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    const currentAdmin = localStorage.getItem('currentAdmin')
    if (currentAdmin) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['admin-login'], { queryParams: { returnUrl: state.url } });
    return false;
    
  }
}
