import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDailyTipModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: AdminDailyTipModalComponent;
  let fixture: ComponentFixture<AdminDailyTipModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDailyTipModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDailyTipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
