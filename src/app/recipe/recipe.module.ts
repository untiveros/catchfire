import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

import { SharedModule } from '../shared/shared.module';

import { RecipeService } from './recipe.service';

@NgModule({
  imports: [
    CommonModule,
    RecipeRoutingModule,
    SharedModule
  ],
  declarations: [RecipeListComponent, RecipeDetailComponent, RecipeEditComponent],
  providers: [
    RecipeService
  ]
})
export class RecipeModule { }
