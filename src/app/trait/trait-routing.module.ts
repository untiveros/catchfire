import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TraitListComponent } from './trait-list/trait-list.component';
import { TraitEditComponent } from './trait-edit/trait-edit.component';

const routes: Routes = [
  {
    path: 'traits',
    component: TraitListComponent
  },
  {
    path: 'traitEdit/:id',
    component: TraitEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraitRoutingModule { }
