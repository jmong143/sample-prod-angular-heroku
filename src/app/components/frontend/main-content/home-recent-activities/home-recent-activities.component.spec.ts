import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRecentActivitiesComponent } from './home-recent-activities.component';

describe('HomeRecentActivitiesComponent', () => {
  let component: HomeRecentActivitiesComponent;
  let fixture: ComponentFixture<HomeRecentActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRecentActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRecentActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
