import { Component, OnInit } from '@angular/core';

import { IGoal } from '../goal';
import { GoalService } from '../goal.service';

import { MdDialog, MdDialogRef, MdSnackBar } from "@angular/material";
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {
  pageTitle: string = 'Goal List';
  errorMessage: string;
  goals: IGoal[];

  constructor(private goalService: GoalService,
    public dialog: MdDialog,
    public snackBar: MdSnackBar) { }

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
      let dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result == 'delete') {
          this.goalService.deleteGoal(goal.goalId)
            .subscribe(
            () => this.removeItem(goal),
            (error: any) => this.errorMessage = <any>error
            );

          this.snackBar.open('Successfully deleted.', '', {
            duration: 3000,
          });
        }
      });
    }
  }

  onSaveComplete(): void {

  }

  removeItem(goal: IGoal): void {
    this.goals.splice(this.goals.indexOf(goal), 1);
  }

}
