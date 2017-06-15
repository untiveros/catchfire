import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeIngredientDetailComponent } from './recipe-ingredient-detail.component';

describe('RecipeIngredientDetailComponent', () => {
  let component: RecipeIngredientDetailComponent;
  let fixture: ComponentFixture<RecipeIngredientDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeIngredientDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeIngredientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
