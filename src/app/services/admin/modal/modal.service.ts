import { Injectable, EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminModalService {
  
  dismissed: boolean = true;
  details: any;  
  change: EventEmitter<boolean> = new EventEmitter();
  viewData: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  getData(data){
    this.details = data;
    this.viewData.emit(this.details)
  }

  showModal(){
    
    this.dismissed = false
    this.change.emit(this.dismissed);
    
  }
}
