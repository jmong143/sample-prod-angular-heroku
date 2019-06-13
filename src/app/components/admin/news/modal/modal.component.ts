import { Component, OnInit } from '@angular/core';
import { AdminModalService } from '../../../../services/admin/modal/modal.service';
import { DailyTipService } from '../../../../services/admin/daily-tip/daily-tip.service'

@Component({
  selector: 'admin-daily-tip-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class AdminDailyTipModalComponent implements OnInit {
  dismissed: boolean = true;
  data: any;
  msg;
  x;
  newTip: any = {};
  a: number = 0;
  b: any = []

  constructor(
    private dailyTipService : DailyTipService,
    private modal: AdminModalService
  ) { }

  ngOnInit() {
    this.modal.change.subscribe(
      res => {
      this.dismissed = res;
      },
      err=>{

      }
    );

    this.modal.viewData.subscribe(
      res=>{
        this.data = res
        let a = 0;
        this.data.forEach((xx)=>{
          if(xx.isArchive == false){
            a += 1
            this.b.push(xx)
          }
        })

        this.a = (a / 2) - 1
      },
      err=>{

      }
    );
  }

  viewAllDailyTip(){
    this.data = []
    this.newTip = {}
    this.dailyTipService.getDailyTip().subscribe(
      res=>{
        this.data = res
        this.data = this.data.tips
      },
      err=>{

      }
    )
  }

  addDailyTip(){
    this.dailyTipService.addDailyTip(this.newTip).subscribe(
      res=>{
        this.viewAllDailyTip()
        this.msg = res
        this.msg = this.msg.message
        this.isNulltimeout()
        this.x = null
      },
      err=>{
        this.msg = 'Don\'t leave input blank before submitting.'
      }
    )
  }

  updateTip(req, id){
    this.viewAllDailyTip()
    this.dailyTipService.updateDailyTip(req, id).subscribe(
      res=>{
        this.msg = res
        this.msg = this.msg.message
        this.isNulltimeout()
        this.x = null
      },
      err=>{
        this.msg = err
      }
    )
  }

  deleteTip(id){
    let ok = confirm('Are you sure you want to delete this tip?')
    if(ok){
      this.viewAllDailyTip()
      this.dailyTipService.deleteDailyTip(id).subscribe(
        res=>{
          this.msg = res
          this.msg = this.msg.message
          this.isNulltimeout()
          this.x = null
          console.log(this.msg)
        },
        err=>{
          this.msg = err
        }
      )
    }
  }

  modalCloseBtn() {
    this.isNull()
    this.dismissed = true
  }

  editTip(i){
    this.msg = null
    this.x = i
  }

  isNulltimeout(){
    setInterval(()=>{
      this.msg = null
    },5000)
  }

  isNull(){
    this.msg = null
    this.x = null
    
  }

  closeEdit() {
    this.isNull()
  }

}
