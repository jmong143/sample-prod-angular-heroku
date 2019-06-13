import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubjectModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: AdminSubjectModalComponent;
  let fixture: ComponentFixture<AdminSubjectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubjectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
