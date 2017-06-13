import { Component, OnInit } from '@angular/core';

import { IGoalArea } from '../goal-area';
import { GoalAreaService } from '../goal-area.service';

import { MdDialog, MdDialogRef, MdSnackBar } from "@angular/material";
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-goal-area-list',
  templateUrl: './goal-area-list.component.html',
  styleUrls: ['./goal-area-list.component.css']
})
export class GoalAreaListComponent implements OnInit {
  pageTitle: string = 'Goal Area List';
  errorMessage: string;
  goalAreas: IGoalArea[];

  constructor(private goalAreaService: GoalAreaService,
    public dialog: MdDialog,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.goalAreaService.getGoalAreas()
      .subscribe(goalAreas => this.goalAreas = goalAreas,
      error => this.errorMessage = <any>error);
  }

  deleteGoalArea(goalArea: IGoalArea): void {
    if (goalArea.goalAreaId === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      let dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result == 'delete') {
          this.goalAreaService.deleteGoalArea(goalArea.goalAreaId)
            .subscribe(
            () => this.removeItem(goalArea),
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

  removeItem(goalArea: IGoalArea): void {
    this.goalAreas.splice(this.goalAreas.indexOf(goalArea), 1);
  }

}
