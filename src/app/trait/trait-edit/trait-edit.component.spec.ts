import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitEditComponent } from './trait-edit.component';

describe('TraitEditComponent', () => {
  let component: TraitEditComponent;
  let fixture: ComponentFixture<TraitEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
