import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/admin/user/user.service';
import { SubjectService } from '../../../services/admin/subject/subject.service';
import { Chart } from 'chart.js'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  usersResponse;
  users;
  subjectList;
  totalUsers;
  totalSubject;
  lineChart: any;

  constructor(
    private userService: UserService,
    private subjectService: SubjectService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.usersResponse = this.route.snapshot.data['userOverview'];
    this.users = this.usersResponse.users
    this.totalUsers = this.usersResponse.total

    this.users.sort((a,b)=>{
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    this.subjectList = this.route.snapshot.data['subjectOverview'];
    this.totalSubject = this.subjectList.total

    this.getSubjectByEnrollees()
  }

  getSubjectByEnrollees(){
    this.subjectService.getSubjectEnrollees().subscribe(
      res => {
        const chartSubject = res

        const subjectName = []
        const subjectEnrollee = []

        chartSubject.forEach((data, i) => {
          if (i < 10) {
            subjectName.push(data.name)
            subjectEnrollee.push(data.totalEnrolled)
            this.lineChart = new Chart('lineChart', {
              type: 'line',
              data: {
                labels: subjectName,
                datasets: [{
                  label: 'Number of enrolled users',
                  data: subjectEnrollee,
                  backgroundColor: ["rgba(255, 0, 0, 0.77)"],
                  borderColor: ["#b71c1c"],
                }]
              }
            });
          }

        })
      }
    )
  }

  reloadChart(){
    this.getSubjectByEnrollees()
  }
}

