import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/admin/auth/auth.service'
import { BreadcrumbsService } from '../../../services/admin/breadcrumbs/breadcrumbs.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  title;

  constructor(
    private router: Router,
    private authService: AuthService,
    private breadcrumbsService : BreadcrumbsService
  ) { }

  ngOnInit() {
    this.validate()
  }

  validate(){
    this.authService.validate().subscribe(
      res => {
        
      },
      err => {
        alert('Session expired!')
        this.authService.logout()
      })
  }

  onActivated(){
    this.validate()
    this.breadcrumbsService.getRouteName()
    this.title= this.breadcrumbsService.title
  }

}
