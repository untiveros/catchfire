import { Component, OnInit } from '@angular/core';

import { IGoal } from '../goal';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {
  pageTitle: string = 'Goal List';
  errorMessage: string;
  goals: IGoal[];

  constructor(private goalService: GoalService) { }

  ngOnInit() {
    this.goalService.getGoals()
      .subscribe(goals => this.goals = goals,
      error => this.errorMessage = <any>error);
  }

  deleteGoal(goal: IGoal): void {
    if (goal.goalId === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the goal: ${goal.goalName}?`)) {
        this.goalService.deleteGoal(goal.goalId)
          .subscribe(
          () => this.removeItem(goal),
          (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  onSaveComplete(): void {

  }

  removeItem(goal: IGoal): void {
    this.goals.splice(this.goals.indexOf(goal), 1);
  }

}
