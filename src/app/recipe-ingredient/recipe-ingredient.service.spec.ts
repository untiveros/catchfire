import { TestBed, inject } from '@angular/core/testing';

import { RecipeIngredientService } from './recipe-ingredient.service';

describe('RecipeIngredientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeIngredientService]
    });
  });

  it('should ...', inject([RecipeIngredientService], (service: RecipeIngredientService) => {
    expect(service).toBeTruthy();
  }));
});
