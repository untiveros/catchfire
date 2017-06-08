import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalRoutingModule } from './goal-routing.module';
import { GoalListComponent } from './goal-list/goal-list.component';
import { GoalDetailComponent } from './goal-detail/goal-detail.component';
import { GoalEditComponent } from './goal-edit/goal-edit.component';

import { SharedModule } from '../shared/shared.module';

import { GoalService } from './goal.service';

@NgModule({
  imports: [
    CommonModule,
    GoalRoutingModule,
    SharedModule
  ],
  declarations: [GoalListComponent, GoalDetailComponent, GoalEditComponent],
  providers: [
    GoalService
  ]
})
export class GoalModule { }
