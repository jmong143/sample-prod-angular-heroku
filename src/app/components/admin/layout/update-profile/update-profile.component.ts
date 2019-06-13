import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component'

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
  providers: [AdminHeaderComponent]
})


export class UpdateProfileComponent implements OnInit {

  constructor(private adminHeader: AdminHeaderComponent){ }
  test = this.adminHeader.isShowed

  modalCloseBtn(e){
    this.test = false;
  }


  ngOnInit() {
  }

}