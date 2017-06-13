import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalAreaRoutingModule } from './goal-area-routing.module';
import { GoalAreaListComponent } from './goal-area-list/goal-area-list.component';
import { GoalAreaEditComponent } from './goal-area-edit/goal-area-edit.component';
import { GoalAreaDetailComponent } from './goal-area-detail/goal-area-detail.component';

import { SharedModule } from '../shared/shared.module';

import { GoalAreaService } from './goal-area.service';

@NgModule({
  imports: [
    CommonModule,
    GoalAreaRoutingModule,
    SharedModule
  ],
  declarations: [GoalAreaListComponent, GoalAreaEditComponent, GoalAreaDetailComponent],
  providers: [
    GoalAreaService
  ]
})
export class GoalAreaModule { }
