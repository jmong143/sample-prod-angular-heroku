import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { AdminNewsService } from '../../../services/admin/news/news.service'
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common'
import { DailyTipService } from '../../../services/admin/daily-tip/daily-tip.service'
import { AdminModalService } from '../../../services/admin/modal/modal.service'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class AdminNewsComponent implements OnInit {
  
  public Editor = ClassicEditor;
  public output;

  title: string;
  news: any;
  preview;
  newsList: any;
  myDate = new Date();
  data: any = null;
  isActive: boolean = false;
  x: number;
  isRefreshed: boolean = true;
  //daily tip vars
  responseBody: any;
  dailyTips: any;
  getAllDailyTips: any;
  
  constructor(
    private newsService : AdminNewsService,
    private route : ActivatedRoute,
    private dailyTipService : DailyTipService,
    private modalService : AdminModalService
  ) {
    this.newsList = this.route.snapshot.data['newsList'];
  }

  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();
    this.output = data
  }

  closePreview() {
    this.preview = null
  }

  submitCkeditor() {
    this.preview = '<center><h1>"' +
                    this.title + 
                    '"</h1></center>' +
                    '<div class="news-preview-author">by: ' +
                    '<br>Date: ' +
                    formatDate(this.myDate, 'fullDate', 'en') +
                    '</div><br>' +
                    this.output
  }

  submitNews() {
    this.newsService.addNews(this.title, this.output).subscribe(
      res=>{
        alert('Successfully added news')
        this.refresh()
        this.cancelEditNews()
      },
      err=>{
        
      }
    )
  }

  ngOnInit() {
    this.showDailyTips()
  }

  archiveNews(id){
    let ok = confirm('Are you sure you want to delete this news?')
    if(ok){
      this.newsService.archiveNews(id).subscribe(
        res=>{
          this.refresh()
          this.cancelEditNews()
        },
        err=>{
        }
      )
    }
  }

  editNews(id, i){
    this.x = i
    this.newsService.getNewsById(id).subscribe(
      res=>{
        this.news = res
        this.title = this.news.title
        this.data = this.news.description
        this.isActive = true
      }
    )
  }

  updateNews(id){
    this.newsService.updateNews(id, this.title, this.data).subscribe(
      res=>{
        this.refresh()
        this.cancelEditNews()
      },
      err=>{
      }
    )
  }

  cancelEditNews(){
    this.x = null
    this.title = null
    this.data = null
  }

  refresh(){
    this.newsList = null
    this.newsService.getNews().subscribe(
      res=>{
        this.newsList = res
      },
      err=>{
        console.log(err)
      }
    )
  }

  showDailyTips(){
    let randomTip: any;
    this.dailyTipService.getDailyTip().subscribe(
      res => {
        this.responseBody = res
        this.responseBody.tips.forEach((data) => {
          if (!data.isArchive) {
            randomTip = this.responseBody.tips[Math.floor(this.responseBody.tips.length * Math.random())]
            this.dailyTips = randomTip.tip
            setInterval(() => {
              randomTip = this.responseBody.tips[Math.floor(this.responseBody.tips.length * Math.random())]
              this.dailyTips = null
              this.dailyTips = randomTip.tip
            }, 20000)
          }
        })

      },
      err=>{
        
      }
    )
  }

  viewAllTips(){
    this.modalService.getData(this.responseBody.tips)
    this.modalService.showModal()
  }
}
