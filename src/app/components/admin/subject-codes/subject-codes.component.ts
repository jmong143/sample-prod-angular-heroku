import { Component, OnInit } from '@angular/core';
import { SubjectCodeService } from '../../../services/admin/subject-code/subject-code.service'

@Component({
  selector: 'admin-subject-codes',
  templateUrl: './subject-codes.component.html',
  styleUrls: ['./subject-codes.component.scss']
})
export class AdminSubjectCodesComponent implements OnInit {

  dismmised: boolean = true
  subjectCodes: any = [];
  tempSubjectCodes : any = [];
  showSubjects: boolean = false
  x;

  constructor(
    private subjectCodeService : SubjectCodeService
  ) {
    this.subjectCodeService.change.subscribe(
      res => {
        this.dismmised = res;
        this.getSubjectCode()
      },
      err => {

      }
    );
  }

  ngOnInit() {
    this.getSubjectCode()
  }

  getSubjectCode(){
    this.subjectCodes = []
    this.subjectCodeService.viewSubjectCodes().subscribe(
      res=>{
        this.tempSubjectCodes = res
        this.tempSubjectCodes = this.tempSubjectCodes.list
        this.tempSubjectCodes.forEach(data => {
          if(data.subjects.length > 0){
            this.subjectCodes.push(data)
          }
        });
        
        console.log(this.subjectCodes)
      },
      err=>{
      }
    )
  }

  viewSubjects(i){
    this.x = i
    this.showSubjects = true
  }

  copySubjectCode(code){
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = code;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert('Subject code: ' + code + ' is copied!')
  }

  
  closeSubjectCodes(){
    this.subjectCodes = []
    this.dismmised = true 
  }
  
}
