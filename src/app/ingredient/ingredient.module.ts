import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientRoutingModule } from './ingredient-routing.module';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientDetailComponent } from './ingredient-detail/ingredient-detail.component';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';

import { SharedModule } from '../shared/shared.module';

import { IngredientService } from './ingredient.service';

@NgModule({
  imports: [
    CommonModule,
    IngredientRoutingModule,
    SharedModule
  ],
  declarations: [IngredientListComponent, IngredientDetailComponent, IngredientEditComponent],
  providers: [
    IngredientService
  ]
})
export class IngredientModule { }
