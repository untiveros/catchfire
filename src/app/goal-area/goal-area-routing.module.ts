import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoalAreaListComponent } from './goal-area-list/goal-area-list.component';
import { GoalAreaEditComponent } from './goal-area-edit/goal-area-edit.component';

const routes: Routes = [
  {
    path: 'goal-areas',
    component: GoalAreaListComponent
  },
  {
    path: 'goalAreaEdit/:id',
    component: GoalAreaEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalAreaRoutingModule { }
