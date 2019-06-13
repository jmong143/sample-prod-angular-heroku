import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonNavBarComponent } from './non-nav-bar.component';

describe('NonNavBarComponent', () => {
  let component: NonNavBarComponent;
  let fixture: ComponentFixture<NonNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
