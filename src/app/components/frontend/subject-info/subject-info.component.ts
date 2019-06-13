import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from "@angular/router"; 
import { TopicService } from '../../../services/frontend/topic/topic.service';
@Component({
  selector: 'app-subject-info',
  templateUrl: './subject-info.component.html',
  styleUrls: ['./subject-info.component.scss']
})
export class SubjectInfoComponent implements OnInit {
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;
  constructor(private router: Router, private route: ActivatedRoute, private frontTopicService: TopicService) {
    this.currentUrl = this.router.url;
    
  }
  subjectInfo: any;
  topicDesc: any
  topicInfo: any;
  ngOnInit() {
    let subjectInfoRes = this.route.snapshot.data.subjectInfoResolve
    if(!subjectInfoRes.error){
      this.subjectInfo = subjectInfoRes;
      this.frontTopicService.getTopicsPerSubject(subjectInfoRes.id).subscribe(
        (data : any) => {
          this.topicInfo = data
        }
      )
    }
  }
  ngAfterInit(){
    
  }

  lessonList(e, subjectId, subjectName, topicId, topicName){
    let subjName = subjectName.replace(/ /g, '-').toLowerCase();
    let topName = topicName.replace(/ /g, '-').toLowerCase();
    let linkRoute = `/lesson/${subjName}`;
    
    this.router.navigate([`${linkRoute.split('?')[0]}`], { queryParams: {topic: topName, id: subjectId, topId: topicId}});
    
  }
}
