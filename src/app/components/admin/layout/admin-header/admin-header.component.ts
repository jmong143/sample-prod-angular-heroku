import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from '../../../../services/admin/auth/auth.service';
import { UserService } from '../../../../services/admin/user/user.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})

export class AdminHeaderComponent implements OnInit {
  @Injectable({
    providedIn: 'root'
  })
  isActive = false
  isShowed = false
  count = 1
  profile;
  firstName;
  lastName;
  email;
  
  constructor(
    private authService: AuthService,
    private userService: UserService
  ){}

  linkClicked(e) {
    if(this.count == 1){
      this.isActive = true
    }
    if(this.count == 2){
      this.isActive = false
      this.count = 0
    }
  
    this.count++
  }

  logOut(e) {
    let ok = confirm("Are you sure you want to log out?");
    if (ok == true) {
      this.authService.logout()
    }
  }

  // for modal admin edit profile

  editBtnClicked(e){
    this.isShowed = true
  }

  modalCloseBtn(e){
    this.isShowed = false
  }
  // end for modal admin edit profile
  ngOnInit() {
    // this.userService.getProfile().subscribe(res => {
    //   this.profile = res
    //   this.firstName = this.profile.firstName
    //   this.lastName = this.profile.lastName
    //   this.email= this.profile.email
    // });
  }

}
