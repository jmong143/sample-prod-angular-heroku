import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubjectCodesComponent } from './subject-codes.component';

describe('SubjectCodesComponent', () => {
  let component: AdminSubjectCodesComponent;
  let fixture: ComponentFixture<AdminSubjectCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubjectCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubjectCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
