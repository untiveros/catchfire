import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalAreaListComponent } from './goal-area-list.component';

describe('GoalAreaListComponent', () => {
  let component: GoalAreaListComponent;
  let fixture: ComponentFixture<GoalAreaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalAreaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalAreaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
