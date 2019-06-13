import { Component, OnInit } from '@angular/core';
import { AdminNewsService } from '../../../../services/admin/news/news.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-news-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class AdminNewsViewComponent implements OnInit {

  newsId : any;
  news : any
  constructor(
    private newsService : AdminNewsService,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.newsId = this.route.snapshot.paramMap.get("id")
    console.log(this.newsId)
    this.newsService.getNewsById(this.newsId).subscribe(
          res=>{
            this.news = res
          },
          err=>{
          }
        )
  }

//  sendNewsId(id){
//   this.newsService.getNewsById(id).subscribe(
//     res=>{
//       this.news = res
//       console.log(this.news)
//     },
//     err=>{
//       console.log(err)
//     }
//   )
//  }


}
