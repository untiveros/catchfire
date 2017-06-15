import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';

const routes: Routes = [
  {
    path: 'ingredients',
    component: IngredientListComponent
  },
  {
    path: 'ingredientEdit/:id',
    component: IngredientEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientRoutingModule { }
