import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { GoalService } from '../goal.service';
import { IGoal } from '../goal';

import { GoalAreaService } from '../../goal-area/goal-area.service';
import { IGoalArea } from '../../goal-area/goal-area';

import { MdSnackBar } from "@angular/material";

@Component({
  selector: 'app-goal-edit',
  templateUrl: './goal-edit.component.html',
  styleUrls: ['./goal-edit.component.css']
})
export class GoalEditComponent implements OnInit {
  pageTitle: string;

  errorMessage: string;

  goalForm: FormGroup;
  goal: IGoal;
  private sub: Subscription;

  goalAreas: IGoalArea[];

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private goalService: GoalService,
    private goalAreaService: GoalAreaService,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.goalForm = this.fb.group({
      goalName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      goalDescription: ['', [Validators.maxLength(500)]],
      goalAreaId: ['']
    });

    // Read the Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getGoal(id);
      }
    );



    const goalControl = this.goalForm.get('goalName');
    goalControl.valueChanges.debounceTime(1000).subscribe(value => this.goalSetMessage(goalControl));

    const goalDescriptionControl = this.goalForm.get('goalDescription');
    goalDescriptionControl.valueChanges.debounceTime(1000).subscribe(value => this.goalDescriptionSetMessage(goalDescriptionControl));

    this.goalAreaService.getGoalAreas()
      .subscribe(goalAreas => this.goalAreas = goalAreas,
      error => this.errorMessage = <any>error);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goalMessage: string;
  private goalValidationMessages = {
    required: 'Please enter goal.',
    minlength: 'Minimum length is 3.',
    maxlength: 'Maximum length is 500.'
  };
  goalSetMessage(c: AbstractControl): void {
    this.goalMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.goalMessage = Object.keys(c.errors).map(key =>
        this.goalValidationMessages[key]).join(' ');
    }
  }

  goalDescriptionMessage: string;
  private goalDescriptionValidationMessages = {
    maxlength: 'Maximum length is 500.'
  };
  goalDescriptionSetMessage(c: AbstractControl): void {
    this.goalDescriptionMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.goalDescriptionMessage = Object.keys(c.errors).map(key =>
        this.goalDescriptionValidationMessages[key]).join(' ');
    }
  }







  getGoal(id: number): void {
    this.goalService.getGoal(id)
      .subscribe(
      (goal: IGoal) => this.onGoalRetrieved(goal),
      (error: any) => this.errorMessage = <any>error
      );
  }

  onGoalRetrieved(goal: IGoal): void {
    if (this.goalForm) {
      this.goalForm.reset();
    }
    this.goal = goal;

    if (this.goal.goalId === 0) {
      this.pageTitle = 'Add Goal';
    } else {
      this.pageTitle = `Edit Goal: ${this.goal.goalName}`;
    }

    // Update the data on the form
    this.goalForm.patchValue({
      goalName: this.goal.goalName,
      goalDescription: this.goal.goalDescription,
      goalAreaId: this.goal.goalAreaId
    });
  }

  saveGoal(): void {
    if (this.goalForm.dirty && this.goalForm.valid) {
      // Copy the form values over the product object values
      let p = Object.assign({}, this.goal, this.goalForm.value);

      this.goalService.saveGoal(p)
        .subscribe(
        () => this.onSaveComplete(),
        (error: any) => this.onError(<any>error)
        );
    } else if (!this.goalForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.snackBar.open('Successfully saved.', '', {
      duration: 3000,
    });

    // Reset the form to clear the flags
    this.goalForm.reset();
    this.router.navigate(['/goals']);
  }

  onError(error: any): void {
    this.snackBar.open(error, '', {
      duration: 3000,
    });
  }

}
