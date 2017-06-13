import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalAreaDetailComponent } from './goal-area-detail.component';

describe('GoalAreaDetailComponent', () => {
  let component: GoalAreaDetailComponent;
  let fixture: ComponentFixture<GoalAreaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalAreaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalAreaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
