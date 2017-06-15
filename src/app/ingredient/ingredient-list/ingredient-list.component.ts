import { Component, OnInit } from '@angular/core';

import { IIngredient } from '../ingredient';
import { IngredientService } from '../ingredient.service';

import { MdDialog, MdDialogRef, MdSnackBar } from "@angular/material";
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {
  pageTitle: string = 'Ingredient List';
  errorMessage: string;
  ingredients: IIngredient[];

  constructor(private ingredientService: IngredientService,
    public dialog: MdDialog,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.ingredientService.getIngredients()
      .subscribe(ingredients => this.ingredients = ingredients,
      error => this.errorMessage = <any>error);
  }

  deleteIngredient(ingredient: IIngredient): void {
    if (ingredient.ingredientId === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      let dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result == 'delete') {
          this.ingredientService.deleteIngredient(ingredient.ingredientId)
            .subscribe(
            () => this.removeItem(ingredient),
            (error: any) => this.errorMessage = <any>error
            );

          this.snackBar.open('Successfully deleted.', '', {
            duration: 3000,
          });
        }
      });
    }
  }

  onSaveComplete(): void {

  }

  removeItem(ingredient: IIngredient): void {
    this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
  }

}
