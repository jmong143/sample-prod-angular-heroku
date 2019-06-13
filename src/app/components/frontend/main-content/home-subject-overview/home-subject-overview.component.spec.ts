import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSubjectOverviewComponent } from './home-subject-overview.component';

describe('HomeSubjectOverviewComponent', () => {
  let component: HomeSubjectOverviewComponent;
  let fixture: ComponentFixture<HomeSubjectOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSubjectOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSubjectOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
