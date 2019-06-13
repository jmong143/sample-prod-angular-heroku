import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import * as globalVar from '../../../app-global'; 
import { Router } from '@angular/router';
import { UserService } from '../../../services/frontend/user/user.service';
import { AuthFrontEnd } from '../../../models/frontend/AuthFrontEnd';
import { showNotif } from '../../../../../src/assets/js/loader.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
 

  loginOnSubmit(auth: AuthFrontEnd){
    this.preload.nativeElement.classList.remove('is-hidden');
    const loginUser = {
      email: this.email,
      password: this.password
    }
    console.log(auth + ">>> " + JSON.stringify(loginUser))
    this.frontAuthService.loginUser(auth, loginUser).subscribe(
      
      (data : any) => {
        if(data){ 
          showNotif("Successfully logged in", "success");
          this.preload.nativeElement.classList.toggle('is-hidden')
          localStorage.setItem("pinnacleUser", data.token);
          this.router.navigate(['/']);
        }else{
          console.log(data)

        }
      },
      err => {
        console.log(err)
        showNotif("Failed to login, Please try again", "danger");
        this.preload.nativeElement.classList.toggle('is-hidden')
      }
    );
  }

}
