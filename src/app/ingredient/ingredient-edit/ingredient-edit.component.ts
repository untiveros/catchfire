import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IngredientService } from '../ingredient.service';
import { IIngredient } from '../ingredient';

import { MdSnackBar } from "@angular/material";

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent implements OnInit {
  pageTitle: string;

  errorMessage: string;

  ingredientForm: FormGroup;
  ingredient: IIngredient;
  private sub: Subscription;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ingredientService: IngredientService,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.ingredientForm = this.fb.group({
      ingredientName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      ingredientDescription: ['', [Validators.maxLength(500)]]
    });

    // Read the Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getIngredient(id);
      }
    );



    const ingredientControl = this.ingredientForm.get('ingredientName');
    ingredientControl.valueChanges.debounceTime(1000).subscribe(value => this.ingredientSetMessage(ingredientControl));

    const ingredientDescriptionControl = this.ingredientForm.get('ingredientDescription');
    ingredientDescriptionControl.valueChanges.debounceTime(1000).subscribe(value => this.ingredientDescriptionSetMessage(ingredientDescriptionControl));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ingredientMessage: string;
  private ingredientValidationMessages = {
    required: 'Please enter ingredient.',
    minlength: 'Minimum length is 3.',
    maxlength: 'Maximum length is 500.'
  };
  ingredientSetMessage(c: AbstractControl): void {
    this.ingredientMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.ingredientMessage = Object.keys(c.errors).map(key =>
        this.ingredientValidationMessages[key]).join(' ');
    }
  }

  ingredientDescriptionMessage: string;
  private ingredientDescriptionValidationMessages = {
    maxlength: 'Maximum length is 500.'
  };
  ingredientDescriptionSetMessage(c: AbstractControl): void {
    this.ingredientDescriptionMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.ingredientDescriptionMessage = Object.keys(c.errors).map(key =>
        this.ingredientDescriptionValidationMessages[key]).join(' ');
    }
  }








  getIngredient(id: number): void {
    this.ingredientService.getIngredient(id)
      .subscribe(
      (ingredient: IIngredient) => this.onIngredientRetrieved(ingredient),
      (error: any) => this.errorMessage = <any>error
      );
  }

  onIngredientRetrieved(ingredient: IIngredient): void {
    if (this.ingredientForm) {
      this.ingredientForm.reset();
    }
    this.ingredient = ingredient;

    if (this.ingredient.ingredientId === 0) {
      this.pageTitle = 'Add Ingredient';
    } else {
      this.pageTitle = `Edit Ingredient: ${this.ingredient.ingredientName}`;
    }

    // Update the data on the form
    this.ingredientForm.patchValue({
      ingredientName: this.ingredient.ingredientName,
      ingredientDescription: this.ingredient.ingredientDescription
    });
  }

  saveIngredient(): void {
    if (this.ingredientForm.dirty && this.ingredientForm.valid) {
      // Copy the form values over the product object values
      let p = Object.assign({}, this.ingredient, this.ingredientForm.value);

      this.ingredientService.saveIngredient(p)
        .subscribe(
        () => this.onSaveComplete(),
        (error: any) => this.onError(<any>error)
        );
    } else if (!this.ingredientForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.snackBar.open('Successfully saved.', '', {
      duration: 3000,
    });

    // Reset the form to clear the flags
    this.ingredientForm.reset();
    this.router.navigate(['/ingredients']);
  }

  onError(error: any): void {
    this.snackBar.open(error, '', {
      duration: 3000,
    });
  }

}
