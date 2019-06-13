import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.scss']
})
export class AdminSideNavComponent implements OnInit {
  isHidden: boolean = true
  i: number = 1;
  constructor() { }

  manageContent() {
    
    this.i++
    if(this.i == 2){
      this.isHidden = false
    }
    if(this.i == 3){
      this.isHidden = true
      this.i = 1
    }
    
  }

  ngOnInit() {
  }

}
