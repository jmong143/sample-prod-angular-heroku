import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import * as globalVar from '../../../app-global'; 
import { Router } from '@angular/router';
import { UserService } from '../../../services/frontend/user/user.service';
import { AuthFrontEnd } from '../../../models/frontend/AuthFrontEnd';
import { showNotif } from '../../../../../src/assets/js/loader.js';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  @ViewChild('preLoader') preload;
  
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
 

 updatePasswordOnSubmit($event: any, auth: AuthFrontEnd){
    this.preload.nativeElement.classList.remove('is-hidden');
    const formNewPassword = {
      newPassword: this.password
    }
    this.frontAuthService.updatePassword(auth, formNewPassword).subscribe(
      data => {
        console.log("==> " + JSON.stringify(data));
        showNotif(data.message, "success");
        this.preload.nativeElement.classList.toggle('is-hidden')
        this.router.navigate(['/login']);
      },
      err => {
        this.preload.nativeElement.classList.toggle('is-hidden')
        if(err.status == 401){
          showNotif("Session expired, request new one", "danger");
          this.router.navigate(['/reset-password']);
        }else{
          showNotif(err.error.message, "danger");
        }
        
      }
    );
  }
}

