import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service'
import { Users } from '../../../models/admin/Users'

@Injectable({
  providedIn: 'root'
})
export class AdminUserResolverService implements Resolve<Users> {
  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<Users> {
    return this.userService.getUser();
  }
  
}
