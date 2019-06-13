import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router"; 
import { HomeService } from '../../../services/frontend/home/home.service';
import { UserService } from '../../../services/frontend/user/user.service';
import { AuthFrontEnd } from '../../../models/frontend/AuthFrontEnd';
import { showNotif } from '../../../../../src/assets/js/loader.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  @ViewChild('preLoader') preload;
  @ViewChild('tipNotif') tipNotif: ElementRef;
  userInfo: any;
  message:string;

  constructor(
    private frontHomeService: HomeService, 
    private frontAuthService: UserService, 
    private router: Router,
    private route: ActivatedRoute
    ) {
      // this.actr.data.map(data => data.homeResolve.json() ).subscribe((res) => {
      //   console.log("response==> " + res)
      // })
    }

  ngOnInit() {
    setTimeout(() => {
      const dailyTip = document.querySelector('.daily-tip-hid-box') as HTMLElement;
    dailyTip.style.top = '0';  
    }, 500);
    setTimeout(() => {
      const dailyTip = document.querySelector('.daily-tip-hid-box') as HTMLElement;
    dailyTip.style.top = '';  
    }, 10000);
    let resssss = this.route.snapshot.data.homeResolve
    if(resssss.error){
      
    }else{
      
      this.userInfo = this.route.snapshot.data.homeResolve;
    }

    // new Object().toString()
    // if(this.route.snapshot.data.homeResolve == "Unauthorized."){
    //   console.log("AAAA")
    //   // this.router.navigate(['/login']);
    //   // showNotif("Please login first", "danger");  
    // }else{
    //   this.userInfo = this.route.snapshot.data.homeResolve;
    // }
    
    
  }


  // getHome(){
  //   this.frontHomeService.getHomeService().subscribe(
  //     data => {
  //       // this.userInfo = data;
  //       this.userInfo = this.route.snapshot.data.homeResolve;  
  //       console.log("home>> " + this.route.snapshot.data.homeResolve)
  //     },
  //     err => {

  //     }
  //   )
      
  //     // data => {
  //     //   console.log("home>> " + JSON.stringify(data))
  //     //   this.userInfo = data;
  //     //   // showNotif("Successfully logged in", "success");
  //     //   // this.preload.nativeElement.classList.toggle('is-hidden')
  //     //   // localStorage.setItem("pinnacleUser", JSON.stringify(data));
  //     //   // this.router.navigate(['/']);
  //     //   // window.location.href='/';
  //     //   // window.history.replaceState({}, '',`/`);
  //     // },
  //     // err => {
  //     //   console.log("EERR>> " + JSON.stringify(err))
  //     // }
  //     // )
  // }


  receiveMessage($event) {
    this.message = $event
  }

  

  deleteTipNotif(){
    this.tipNotif.nativeElement.classList.toggle('is-hidden')
    // classList.toggle('is-active');
  }

  

}


