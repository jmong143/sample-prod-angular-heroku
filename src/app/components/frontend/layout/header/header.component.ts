import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/frontend/user/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;
  @ViewChild('sampleModal') sampleModal: ElementRef;
  @ViewChild('linkTabUserProfile') linkTabUserProfile: ElementRef;
  @ViewChild('linkTabSecurity') linkTabSecurity: ElementRef;
  @ViewChild('linkTabSubscription') linkTabSubscription: ElementRef;
  @ViewChild('tabProfileDetails') tabProfileDetails: ElementRef;
  @ViewChild('tabSecurity') tabSecurity: ElementRef;
  @ViewChild('tabSubscription') tabSubscription: ElementRef;

  @ViewChild('headerHome') headerHome: ElementRef;
  
  
  constructor(private frontAuthService: UserService, private router: Router) { }
  userInfo: any;
  activeLink: any;
  @ViewChild('preLoader') preload;
  ngOnInit() {
    this.frontAuthService.getProfile().subscribe(
      res => {
        // console.log(JSON.stringify(res))
        this.userInfo = res
      },
      err => {

      }
    )
  }
  ngAfterViewInit() {
    this.preload.nativeElement.classList.toggle('is-hidden')
 }

 


  navLinkClick(type){
    if(type == "home"){
      this.headerHome.nativeElement.classList.add('is-active');
      this.router.navigate(['/']);
      this.activeLink = "home";
      
    }else if(type == "subject"){
      this.activeLink = "subject";
      // this.preload.nativeElement.classList.toggle('is-hidden')
      // alert(this.router.url);
      this.router.navigate(['/subjects']);
      // this.preload.nativeElement.classList.remove('is-hidden')

    }else if(type == "notif"){
      this.activeLink = "notif";
      // this.router.navigate(['/']);
    }
  }

  checkIsActive(link){
    
    // if(this.activeLink == "home"){
    //   let classes = {
    //     'custom-is-active': true
    //   }
    //   return classes;
    // }else if(this.activeLink == "subject"){
    //   let classes = {
    //     'custom-is-active': true
    //   }
    //   return classes;
    // }else if(this.activeLink == "notif"){
    //   let classes = {
    //     'custom-is-active': true
    //   }
    //   return classes;
    // }
  }
  // isActive(instruction){
  //   // alert(instruction);
  //   if(instruction == "Home"){
  //     let classes = {
  //       'custom-is-active': true
  //     }
  //     return classes;
  //   }
  // }
  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

  launchModal(type){
    if(type == 'open'){
      this.sampleModal.nativeElement.classList.toggle('is-active')
    }else if(type == 'close'){
      this.sampleModal.nativeElement.classList.remove('is-active')
    }
  }

  tabUserClick(tab){
    if(tab == "profile-details"){
      this.tabProfileDetails.nativeElement.classList.remove('is-hidden')
      this.tabSecurity.nativeElement.classList.add('is-hidden')
      this.tabSubscription.nativeElement.classList.add('is-hidden')
      this.linkTabUserProfile.nativeElement.classList.add('is-active')
      this.linkTabSecurity.nativeElement.classList.remove('is-active')
      this.linkTabSubscription.nativeElement.classList.remove('is-active')
    }else if(tab == "security"){
      this.tabSecurity.nativeElement.classList.remove('is-hidden')
      this.tabProfileDetails.nativeElement.classList.add('is-hidden')
      this.tabSubscription.nativeElement.classList.add('is-hidden')
      this.linkTabUserProfile.nativeElement.classList.remove('is-active')
      this.linkTabSecurity.nativeElement.classList.add('is-active')
      this.linkTabSubscription.nativeElement.classList.remove('is-active')
    }
    else if(tab = "subscription"){
      this.tabSubscription.nativeElement.classList.remove('is-hidden')
      this.tabSecurity.nativeElement.classList.add('is-hidden')
      this.tabProfileDetails.nativeElement.classList.add('is-hidden')
      this.linkTabUserProfile.nativeElement.classList.remove('is-active')
      this.linkTabSecurity.nativeElement.classList.remove('is-active')
      this.linkTabSubscription.nativeElement.classList.add('is-active')
    }
      
  }
}
