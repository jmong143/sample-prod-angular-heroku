import { Component, OnInit, ViewChild } from '@angular/core';
import { validateUser } from '../../../../../assets/js/validateUser.js';

@Component({
  selector: 'app-non-nav-bar',
  templateUrl: './non-nav-bar.component.html',
  styleUrls: ['./non-nav-bar.component.scss']
})
export class NonNavBarComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    // validateUser();
  }

 
}
