import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeIngredientListComponent } from './recipe-ingredient-list.component';

describe('RecipeIngredientListComponent', () => {
  let component: RecipeIngredientListComponent;
  let fixture: ComponentFixture<RecipeIngredientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeIngredientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeIngredientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
