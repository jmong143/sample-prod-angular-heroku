import { Component, OnInit } from '@angular/core';
import { AdminModalService } from '../../../../services/admin/modal/modal.service'
import { SubjectService } from '../../../../services/admin/subject/subject.service'
import { SubjectCodeService } from '../../../../services/admin/subject-code/subject-code.service'
import { showNotif } from '../../../../../../src/assets/js/loader.js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'admin-user-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class AdminUserModalComponent implements OnInit {

  dismissed: boolean = true;
  data: any = {};
  info: string = 'Info is not yet updated by the user';
  input: any = {}
  msg;
  constructor(
    private modal: AdminModalService,
    private subjectService : SubjectService,
    private subjectCodeService : SubjectCodeService

  ) { }
  
  sendSubjectCode(userEmail){
    
    if(this.input.code){
      this.subjectService.sendSubjectCode(this.input.code,  userEmail).subscribe(
        res=>{
          this.msg = res;
          this.msg = JSON.stringify(this.msg.message)
          this.input = {}
          showNotif(this.msg, "success");
        },
        err=>{
          showNotif(err, "danger");
        }
      )
    }else{
      showNotif('Input subject code before sending.', "danger");
    }
  }

  getSubjectCodes(){
    this.subjectCodeService.showSubjectCodes()
  }

  ngOnInit() {
    this.modal.change.subscribe(dismissed => {
      this.dismissed = dismissed;
    });

    this.modal.viewData.subscribe(data=>{
      this.data = data
    })
  }

  modalCloseBtn() {
    this.dismissed = true
  }

}
