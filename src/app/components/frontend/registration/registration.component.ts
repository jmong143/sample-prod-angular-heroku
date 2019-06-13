import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import * as globalVar from '../../../app-global'; 
import { Router } from '@angular/router';
import { UserService } from '../../../services/frontend/user/user.service';
import { RegistrationFrontEnd } from '../../../models/frontend/RegistrationFrontend';
import { AuthFrontEnd } from '../../../models/frontend/AuthFrontEnd';
import { showNotif } from '../../../../../src/assets/js/loader.js';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('preLoader') preload;
  
  email: String;
  password: String;
  firstName: String;
  lastName: String;
  retypePassword: String;

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

 registerOnSubmit(register: RegistrationFrontEnd){
  this.preload.nativeElement.classList.remove('is-hidden');
  const formRegistration = {
    email: this.email,
    password: this.password,
    firstName: this.firstName,
    lastName: this.lastName 
  }
  this.frontAuthService.createUser(register, formRegistration).subscribe(
    
    data => {
      this.preload.nativeElement.classList.toggle('is-hidden')
      showNotif(data.message, "success");
      this.router.navigate(['/login']);
    },
    err => {
      this.preload.nativeElement.classList.toggle('is-hidden')
      showNotif(err.error.message, "danger");
    }
  );

 }

}
