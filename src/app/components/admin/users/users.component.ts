import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../../../services/admin/user/user.service';
import { AdminModalService } from '../../../services/admin/modal/modal.service';
import { AdminUserModalComponent } from '../users/modal/modal.component'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [AdminUserModalComponent]
})
export class UsersComponent implements OnInit {
  searchUser: String;
  constructor(
    private userService: UserService,
    private modalService: AdminModalService,
    private modalComponent: AdminUserModalComponent,
    private route: ActivatedRoute,
    private router : Router
  ) {
    this.users = this.route.snapshot.data['usersList'];
    this.users = this.users.users
  }

  data: any = {};
  isSearching;
  userDetail;
  users;
  msg;
  notifType;

  onSubmit() {

    this.userService.addUser(this.data).pipe(first())
      .subscribe(
        res => {
          this.msg = 'Successfully added new user!'
          this.notifType = 'is-success'
          console.log(res)
          this.loadAllUsers()
        },
        err => {
          this.msg = err.error.message
          this.notifType = 'is-danger'
          console.log(err)
        });
  }

  userClick(user) {

    this.userService.getUserDetails(user.id).pipe(first()).subscribe(
      res => {
        this.userDetail = res
        this.modalService.getData(this.userDetail)
        this.modalService.showModal()
      },
      err => {
        
      });
  }

  onSearch(query) {
    this.users = null
    this.isSearching = 'Searching...'
    
    this.userService.getUserByKeyword(query).subscribe(
      res=>{
        this.users = res
        this.users = this.users.users
        if(this.users.length > 0){
          this.isSearching = null
        }else{
          this.isSearching = 'Sorry no result found.'
        }
      },
      err=>{
        console.log(err)
      }
    )
  }

  ngOnInit() {
  }

  private loadAllUsers() {
    this.users = null
    this.userService.getUser().pipe(first()).subscribe(res => {

      this.users = res
      this.users = this.users.users

    },
      err => {
        this.router.navigate(['admin-login'])
      }
    );
  }

}