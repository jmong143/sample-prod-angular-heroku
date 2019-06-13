import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-recent-activities',
  templateUrl: './home-recent-activities.component.html',
  styleUrls: ['./home-recent-activities.component.scss']
})
export class HomeRecentActivitiesComponent implements OnInit {
  message: any;
  @Input() activity: string;  list:any;
  constructor() { }

  ngOnInit() {
    this.list = JSON.parse(this.activity);
    this.message = this.message;
  }

}
