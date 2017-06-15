import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { RecipeService } from '../recipe.service';
import { IRecipe } from '../recipe';

import { MdSnackBar } from "@angular/material";

import { RecipeIngredientService } from '../recipe-ingredient.service';
import { IRecipeIngredient } from '../recipe-ingredient';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  pageTitle: string;

  errorMessage: string;

  recipeForm: FormGroup;
  recipe: IRecipe;
  private sub: Subscription;

  recipeIngredients: IRecipeIngredient[];

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    public snackBar: MdSnackBar,
    private recipeIngredientService: RecipeIngredientService) { }

  ngOnInit() {
    this.recipeForm = this.fb.group({
      recipeName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      recipeDescription: ['', [Validators.maxLength(500)]]
    });

    // Read the Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getRecipe(id);
      }
    );



    const recipeControl = this.recipeForm.get('recipeName');
    recipeControl.valueChanges.debounceTime(1000).subscribe(value => this.recipeSetMessage(recipeControl));

    const recipeDescriptionControl = this.recipeForm.get('recipeDescription');
    recipeDescriptionControl.valueChanges.debounceTime(1000).subscribe(value => this.recipeDescriptionSetMessage(recipeDescriptionControl));


    this.recipeIngredientService.getRecipeIngredients()
      .subscribe(recipeIngredients => this.recipeIngredients = recipeIngredients,
      error => this.errorMessage = <any>error);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  recipeMessage: string;
  private recipeValidationMessages = {
    required: 'Please enter recipe.',
    minlength: 'Minimum length is 3.',
    maxlength: 'Maximum length is 500.'
  };
  recipeSetMessage(c: AbstractControl): void {
    this.recipeMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.recipeMessage = Object.keys(c.errors).map(key =>
        this.recipeValidationMessages[key]).join(' ');
    }
  }

  recipeDescriptionMessage: string;
  private recipeDescriptionValidationMessages = {
    maxlength: 'Maximum length is 500.'
  };
  recipeDescriptionSetMessage(c: AbstractControl): void {
    this.recipeDescriptionMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.recipeDescriptionMessage = Object.keys(c.errors).map(key =>
        this.recipeDescriptionValidationMessages[key]).join(' ');
    }
  }








  getRecipe(id: number): void {
    this.recipeService.getRecipe(id)
      .subscribe(
      (recipe: IRecipe) => this.onRecipeRetrieved(recipe),
      (error: any) => this.errorMessage = <any>error
      );
  }

  onRecipeRetrieved(recipe: IRecipe): void {
    if (this.recipeForm) {
      this.recipeForm.reset();
    }
    this.recipe = recipe;

    if (this.recipe.recipeId === 0) {
      this.pageTitle = 'Add Recipe';
    } else {
      this.pageTitle = `Edit Recipe: ${this.recipe.recipeName}`;
    }

    // Update the data on the form
    this.recipeForm.patchValue({
      recipeName: this.recipe.recipeName,
      recipeDescription: this.recipe.recipeDescription
    });
  }

  saveRecipe(): void {
    if (this.recipeForm.dirty && this.recipeForm.valid) {
      // Copy the form values over the product object values
      let p = Object.assign({}, this.recipe, this.recipeForm.value);

      this.recipeService.saveRecipe(p)
        .subscribe(
        () => this.onSaveComplete(),
        (error: any) => this.onError(<any>error)
        );
    } else if (!this.recipeForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.snackBar.open('Successfully saved.', '', {
      duration: 3000,
    });

    // Reset the form to clear the flags
    this.recipeForm.reset();
    this.router.navigate(['/recipes']);
  }

  onError(error: any): void {
    this.snackBar.open(error, '', {
      duration: 3000,
    });
  }

}
