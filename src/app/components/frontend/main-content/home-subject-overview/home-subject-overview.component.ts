import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-subject-overview',
  templateUrl: './home-subject-overview.component.html',
  styleUrls: ['./home-subject-overview.component.scss']
})
export class HomeSubjectOverviewComponent implements OnInit {

  @Input() subject: string;  list:any;
  constructor() { }

  ngOnInit() {
    this.list = JSON.parse(this.subject);
  }

}
