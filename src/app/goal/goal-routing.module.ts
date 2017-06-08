import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoalListComponent } from './goal-list/goal-list.component';
import { GoalEditComponent } from './goal-edit/goal-edit.component';

const routes: Routes = [
  {
    path: 'goals',
    component: GoalListComponent
  },
  {
    path: 'goalEdit/:id',
    component: GoalEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalRoutingModule { }
