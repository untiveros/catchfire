import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeIngredientRoutingModule } from './recipe-ingredient-routing.module';
import { RecipeIngredientListComponent } from './recipe-ingredient-list/recipe-ingredient-list.component';
import { RecipeIngredientDetailComponent } from './recipe-ingredient-detail/recipe-ingredient-detail.component';
import { RecipeIngredientEditComponent } from './recipe-ingredient-edit/recipe-ingredient-edit.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RecipeIngredientRoutingModule,
    SharedModule
  ],
  declarations: [RecipeIngredientListComponent, RecipeIngredientDetailComponent, RecipeIngredientEditComponent]
})
export class RecipeIngredientModule { }
