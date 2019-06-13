import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import * as globalVar from '../../../app-global'; 
import { Router } from '@angular/router';
import { UserService } from '../../../services/frontend/user/user.service';
import { AuthFrontEnd } from '../../../models/frontend/AuthFrontEnd';
import { showNotif } from '../../../../../src/assets/js/loader.js';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('preLoader') preload;
  
  email: String;
  password: String;
  constructor(private frontAuthService: UserService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem("pinnacleUser") === null) {
    }else{
      this.router.navigate(['/']);
      // this.frontAuthService.validateSession()
    }
  }
  ngAfterViewInit() {
    this.preload.nativeElement.classList.toggle('is-hidden')
 }
 

 resetPassOnSubmit(auth: AuthFrontEnd){
    this.preload.nativeElement.classList.remove('is-hidden');
    const formResetPassword = {
      email: this.email
    }
    this.frontAuthService.resetPassword(auth, formResetPassword).subscribe(
      data => {
        this.preload.nativeElement.classList.toggle('is-hidden')
        showNotif(data.message, "success");
        // this.router.navigate(['/login']);
      },
      err => {
        showNotif("Something went wrong, Please try again", "danger");
        this.preload.nativeElement.classList.toggle('is-hidden')
      }
    );
  }


}
