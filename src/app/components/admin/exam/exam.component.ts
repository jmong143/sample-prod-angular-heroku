import { Component, OnInit, Injectable } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})


export class ExamComponent implements OnInit {
  @Injectable({
    providedIn: 'root'
  })
  public Editor = ClassicEditor;
  public output;

    public onChange( { editor }: ChangeEvent ) {
        const data = editor.getData();
        this.output = data
    }

    submitCkeditor(e) {
      alert(this.output)
    }

  constructor() { }

  ngOnInit() {
  }

}
