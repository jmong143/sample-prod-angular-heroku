import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, Params, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from "@angular/router"; 
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']

})
export class SubjectsComponent implements OnInit {
  @ViewChild('preLoader') preload;
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }
  subjects:any[];
  myVariable: {projectId: string, userId: string};
  paramsSubscription: Subscription;
  ngOnInit() {
    let subjectsRes = this.route.snapshot.data.subjectResolve
    if(!subjectsRes.error){
      // this.route.params['id'] == "aaa";
      // this.router.navigate(['/aaaa', { page: 'subject/:id' }]);
      this.subjects = subjectsRes.subjects;
    }
    this.preload.nativeElement.classList.remove('is-hidden')


  }
  ngAfterViewInit() {
    this.preload.nativeElement.classList.toggle('is-hidden')
 }
//   navigate(){
//     this.router.navigateByUrl(this.router.url.replace("OLD", "NEW ID"));
//     // replace parameter of navigateByUrl function to your required url
// }

  checkIsLock(stat){
    if(stat == false){
      let classes = {
        'subject-lock': true
      }
      return classes;
    }
  }

  subjectInfo(e, id, name, stat){
    if(stat == true){
      let linkTo = name.replace(/ /g, '-').toLowerCase();
      let linkRoute = `/subject/${linkTo}`;
      localStorage.removeItem("subjId");
      localStorage.setItem("subjId", id);
      this.router.url === `/subject/${linkTo}?id=${id}`;
      this.router.navigate([`${linkRoute.split('?')[0]}`], { queryParams: {id: id}});
    }
  }

}
