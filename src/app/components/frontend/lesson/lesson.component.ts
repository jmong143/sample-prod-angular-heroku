import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../services/frontend/lesson/lesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  subjectInfo:any;
  lessonList: any;
  paramTopId: any;
  paramTopName: any;
  paramTopSubjId: any;
  paramTopSubjName: any;
  slides: any[];
  slideConfig = {"slidesToShow": 5, "slidesToScroll": 5};

  constructor(private router: Router, private route: ActivatedRoute, private frontLessonService: LessonService) {
    console.log(JSON.stringify(this.route.params))
    this.route.queryParams.subscribe(params => {
      this.paramTopId = params.topId;
      this.paramTopName = params.topic;
      this.paramTopSubjId = params.id;
    });
    this.route.params.subscribe(params => {
      this.paramTopSubjName = params['name'];
    });
  }

  ngOnInit() {
    let subjectInfoRes = this.route.snapshot.data.subjectInfoResolve
    if(!subjectInfoRes.error){
      this.subjectInfo = subjectInfoRes;
      this.frontLessonService.getLessonsPerTopic(this.paramTopId).subscribe(
        (data : any) => {
          console.log("LESSON==> " + JSON.stringify(data))
          this.lessonList = data
          this.slides = data;
        }
      )
    }
  }

  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }


  clickTopicList(e){
    let subjName = this.paramTopSubjName;
    let linkRoute = `/subject/${subjName}`;
    this.router.navigate([`${linkRoute.split('?')[0]}`], { queryParams: {id: this.paramTopSubjId}});
  }

  stepClick(e, step){
    var i;
    console.log("step dec=> " + step--)
    // for (i = 0; i < 10; i--) { 
    //   // console.log("loop=> " + i)
    // }
  }

}
