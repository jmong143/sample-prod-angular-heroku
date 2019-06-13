import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../../services/admin/subject/subject.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AdminModalService } from '../../../services/admin/modal/modal.service';
import { SubjectCodeService } from '../../../services/admin/subject-code/subject-code.service';
import { showNotif } from '../../../../../src/assets/js/loader.js';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  data: any = {}
  responseBody: any;
  subjects;
  showTopics;
  showDetails;
  genCode: any = []
  msg;
  notifType;
  subjectCode: any;

  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private modalService: AdminModalService,
    private subjectCodeService : SubjectCodeService
  ) {
    this.responseBody = this.route.snapshot.data['subjectList'];
    this.subjects = this.responseBody.subjects
  }

  viewAllSubject() {
    this.subjectService.getSubject().subscribe(
      res => {
        this.subjects = null
        this.responseBody = res
        this.subjects = this.responseBody.subjects
      },
      err => {

      }
    )
  }

  onSubmit() {
    this.subjectService.addSubject(this.data).pipe(first())
      .subscribe(
        res => {
          this.msg = res
          this.msg = this.msg.message
          this.notifType = 'is-success'
          this.viewAllSubject()
        },
        err => {
          this.msg = err.error.message
          this.notifType = 'is-danger'
        });
  }



  subjectSelected(e, req) {
    if (e.target.checked) {
      this.genCode.push(req)
    } else {
      this.genCode.splice(this.genCode.indexOf(req), 1);
    }
  }

   viewDetails(subject) {
     this.subjectService.getSubjectById(subject.id).subscribe(
      res => {
        this.showDetails = res
        this.modalService.getData({subjects:this.showDetails})
        this.modalService.showModal()
      },
      err => {

      }
    )

     this.subjectService.getTopics(subject.id).subscribe(
      res => {
        this.showTopics = res
        this.modalService.getData({topics:this.showTopics})
      },
      err => {
      }
    )
  }

  generateCode() {
    let req = {
      "subjects": this.genCode
    }

    if (this.genCode.length <= 0) {
      showNotif("Please select at least one subject.", "danger");
    } else {
      this.subjectService.generateSubjectCode(req).subscribe(
        res => {
          this.msg = res
          this.msg = this.msg.message
          showNotif(this.msg, "success");
        },
        err => {
          this.msg = err
          this.msg = this.msg.message
          showNotif(this.msg, "danger");
        }
      )
    }
  }

  viewCode(){
    this.subjectCodeService.showSubjectCodes()
  }

  ngOnInit() {

  }

}
