import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  title: string = '';

  constructor(

    private router : Router,
    private route : ActivatedRoute
  ) {}


  getRouteName() {
    this.router.config.forEach((data=>{
      if(data.children){
        data.children.forEach((res)=>{
          if('/admin-control/'+res.path == this.router.url){
            this.title = res.data.title
          }
        })
      }
    }))
  }
}
