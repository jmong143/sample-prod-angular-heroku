import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/admin/auth/auth.service';
import { Router } from '@angular/router';
import { showNotif } from '../../../../../src/assets/js/loader.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  @ViewChild('preLoader') preload;

  data: any = {};
  responseBody: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onSubmit() {
    this.preload.nativeElement.classList.remove('is-hidden');
    this.authService.login(this.data).subscribe(
      res=>{
        this.responseBody = res
        this.preload.nativeElement.classList.toggle('is-hidden')
        localStorage.setItem('currentAdmin', JSON.stringify(this.responseBody.token));
        window.location.href = '/admin-control';
      },
      err=>{
        this.preload.nativeElement.classList.toggle('is-hidden')
        showNotif("Username or password incorrect", "danger");
      }
    )
  }

  ngAfterViewInit() {
    this.preload.nativeElement.classList.toggle('is-hidden')
  }

  ngOnInit() {
    if(localStorage.getItem('currentAdmin')){
      this.router.navigate(['admin-control']);
    }
  }
}
