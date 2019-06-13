import { Component, OnInit } from '@angular/core';
import { AdminModalService } from '../../../../services/admin/modal/modal.service';
import { SubjectService } from '../../../../services/admin/subject/subject.service';
import { FormsModule } from '@angular/forms';
import { showNotif } from '../../../../../../src/assets/js/loader.js';

@Component({
  selector: 'admin-subject-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class AdminSubjectModalComponent implements OnInit {

  x: number;
  dismissed: boolean = true;
  data: any = {};
  msg;
  inputAddTopic: any = {};
  inputAddLesson: any = {};
  subject: any = {};
  topics: any = [];
  lessons: any = [];
  showDetails;
  showTopics;
  topicId;
  topicDesc;
  subjectId: string = '';
  isLoading;
  lessonIsEditing: boolean = false;

  constructor(
    private modal: AdminModalService,
    private subjectService: SubjectService
  ) { }


  ngOnInit() {
    this.modal.change.subscribe(
      res => {
        this.dismissed = res;
      },
      err => {

      }
    );

    this.modal.viewData.subscribe(
      res => {
        this.data = res
        if (this.data.subjects) {
          this.subject = this.data.subjects
          this.subjectId = this.subject.id
        }
        if (this.data.topics) {
          this.data.topics.forEach((data)=>{
            if(data.isArchive == false){
              this.topics.push(data)
            }
          })
        }
        this.x = null

      },
      err => {
      }
    );
  }

  viewSubjectDetails() {
    this.isLoading = 'Loading...'
    this.subjectService.getSubjectById(this.subjectId).subscribe(
      res => {
        this.isLoading = null
        this.showDetails = res
        this.modal.getData({subjects:this.showDetails})
        this.modal.showModal()
      },
      err => {

      }
    )

     this.subjectService.getTopics(this.subjectId).subscribe(
      res => {
        this.showTopics = res
        this.modal.getData({topics:this.showTopics})
      },
      err => {
      }
    )
  }

  subjectDetailsBecameNull() {
    this.subject = {}
    this.topics = []
  }

  addTopic(subjectId) {
    if (this.inputAddTopic.description != null) {
      this.subjectService.addTopic(this.inputAddTopic).subscribe(
        res => {
          this.inputAddTopic = {}
          this.msg = res
          this.subjectDetailsBecameNull()
          this.subjectService.getSubjectById(subjectId).subscribe(
            response => {
              this.showDetails = response
              this.modal.getData({ subjects: this.showDetails })
              this.modal.showModal()
            },
            error => {

            }
          )

          this.subjectService.getTopics(subjectId).subscribe(
            response => {
              this.showTopics = response
              this.modal.getData({ topics: this.showTopics })
            },
            error => {
            }
          )
        },
        err => {
          console.log(err)
        }
      )
    } else {
      showNotif("Please don\'t leave description blank.", "danger");
    }
  }

  updateTopic(topicNum, desc, topicId) {
    
    if (desc != null) {
      
      this.isNull()
      this.subjectService.updateTopic(topicNum, desc, topicId).subscribe(
        res => {
          this.msg = res
          showNotif(this.msg.message, "success");
          
        },
        err => {

        }
      )
    } else {
      showNotif('Description must not leave blank.', 'danger')
    }
  }

  deleteTopic(){
    let ok = confirm('Are you sure you want to delete the topic ' + this.topicDesc + '?')
    if(ok){
      this.subjectService.deleteTopic(this.subjectId, this.topicId).subscribe(
        res=>{
          this.msg = res
          showNotif(this.msg.message, "success");
          this.isNull()
          this.subjectDetailsBecameNull()
          this.viewSubjectDetails()
        },
        err=>{
          this.msg = err
          showNotif(this.msg.message, "danger");
        }
      )
    }
  }

  viewLessons(id, desc) {
    this.topicId = id
    this.topicDesc = desc
    this.lessons = null
    this.isNull()
    this.subjectDetailsBecameNull()
    this.isLoading = 'Loading...'
    this.subjectService.getLesson(id).subscribe(
      res => {
        this.lessons = res
        if(this.lessons.length > 0){
          this.isLoading = null
        }else{
          this.isLoading = 'Sorry no lesson available'
        }
        
      },
      err => {
        this.msg = 'Sorry no lesson available'
      }
    )
  }

  addLesson(){
    if(this.inputAddLesson.description != null){
      this.subjectService.addLesson(this.topicId, this.inputAddLesson).subscribe(
        res=>{
  
          this.inputAddLesson = {}
          this.viewLessons(this.topicId, this.topicDesc)
          this.msg = res
          showNotif(this.msg.message, "success");
        },
        err=>{
          this.msg = err
          showNotif(this.msg.message, "danger");
        }
      )
    }else{
      showNotif("Please don't leave blank", "danger");
    }
    
  }

  editLesson(i){
    this.msg = null
    this.x = i
  }

  updateLesson(id, desc, num){
    this.subjectService.updateLesson(this.topicId, id, desc, num).subscribe(
      res=>{
        this.x = null
        this.msg = res
        showNotif(this.msg.message, "success");
      },
      err=>{
        console.log(err)
      }
    )
  }

  deleteLesson(lessonId){
    let ok = confirm('Are you sure you want to delete this subject?')
    if(ok){
      this.subjectService.deleteLesson(this.topicId, lessonId).subscribe(
        res=>{
          this.viewLessons(this.topicId, this.topicDesc)
        },
        err=>{
          console.log(err)
        }
      )
    }
  }

  cancelLessonUpdate(){
    this.lessonIsEditing = false
  }

  isNull() {
    this.msg = null
    this.isLoading = null
    this.x = null
    this.lessons = []
  }

  editTopic(i) {
    this.msg = null
    this.x = i
  }

  closeEdit() {
    this.x = null
  }

  modalCloseBtn() {
    this.isNull()
    this.subjectDetailsBecameNull()
    this.dismissed = true
  }

  backToSubjectDetails(){
    this.isNull()
    this.subjectDetailsBecameNull()
    this.viewSubjectDetails()
  }

}
