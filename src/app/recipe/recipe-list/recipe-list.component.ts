import { Component, OnInit } from '@angular/core';

import { IRecipe } from '../recipe';
import { RecipeService } from '../recipe.service';

import { MdDialog, MdDialogRef, MdSnackBar } from "@angular/material";
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  pageTitle: string = 'Recipe List';
  errorMessage: string;
  recipes: IRecipe[];

  constructor(private recipeService: RecipeService,
    public dialog: MdDialog,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.recipeService.getRecipes()
      .subscribe(recipes => this.recipes = recipes,
      error => this.errorMessage = <any>error);
  }

  deleteRecipe(recipe: IRecipe): void {
    if (recipe.recipeId === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      let dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result == 'delete') {
          this.recipeService.deleteRecipe(recipe.recipeId)
            .subscribe(
            () => this.removeItem(recipe),
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

  removeItem(recipe: IRecipe): void {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }
}
