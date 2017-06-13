import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { GoalAreaService } from '../goal-area.service';
import { IGoalArea } from '../goal-area';

import { MdSnackBar } from "@angular/material";

@Component({
  selector: 'app-goal-area-edit',
  templateUrl: './goal-area-edit.component.html',
  styleUrls: ['./goal-area-edit.component.css']
})
export class GoalAreaEditComponent implements OnInit {
  pageTitle: string;

  errorMessage: string;

  goalAreaForm: FormGroup;
  goalArea: IGoalArea;
  private sub: Subscription;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private goalAreaService: GoalAreaService,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.goalAreaForm = this.fb.group({
      goalAreaName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      goalAreaDescription: ['', [Validators.maxLength(500)]]
    });

    // Read the Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getGoalArea(id);
      }
    );






    const goalAreaControl = this.goalAreaForm.get('goalAreaName');
    goalAreaControl.valueChanges.debounceTime(1000).subscribe(value => this.goalAreaSetMessage(goalAreaControl));

    const goalAreaDescriptionControl = this.goalAreaForm.get('goalAreaDescription');
    goalAreaDescriptionControl.valueChanges.debounceTime(1000).subscribe(value => this.goalAreaDescriptionSetMessage(goalAreaDescriptionControl));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goalAreaMessage: string;
  private goalAreaValidationMessages = {
    required: 'Please enter goal area.',
    minlength: 'Minimum length is 3.',
    maxlength: 'maximum length is 100.'
  };
  goalAreaSetMessage(c: AbstractControl): void {
    this.goalAreaMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.goalAreaMessage = Object.keys(c.errors).map(key =>
        this.goalAreaValidationMessages[key]).join(' ');
    }
  }

  goalAreaDescriptionMessage: string;
  private goalAreaDescriptionValidationMessages = {
    maxlength: 'maximum length is 500.'
  };
  goalAreaDescriptionSetMessage(c: AbstractControl): void {
    this.goalAreaDescriptionMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.goalAreaDescriptionMessage = Object.keys(c.errors).map(key =>
        this.goalAreaDescriptionValidationMessages[key]).join(' ');
    }
  }








  getGoalArea(id: number): void {
    this.goalAreaService.getGoalArea(id)
      .subscribe(
      (goalArea: IGoalArea) => this.onGoalAreaRetrieved(goalArea),
      (error: any) => this.errorMessage = <any>error
      );
  }

  onGoalAreaRetrieved(goalArea: IGoalArea): void {
    if (this.goalAreaForm) {
      this.goalAreaForm.reset();
    }
    this.goalArea = goalArea;

    if (this.goalArea.goalAreaId === 0) {
      this.pageTitle = 'Add Goal Area';
    } else {
      this.pageTitle = `Edit Goal Area: ${this.goalArea.goalAreaName}`;
    }

    // Update the data on the form
    this.goalAreaForm.patchValue({
      goalAreaName: this.goalArea.goalAreaName,
      goalAreaDescription: this.goalArea.goalAreaDescription
    });
  }

  saveGoalArea(): void {
    if (this.goalAreaForm.dirty && this.goalAreaForm.valid) {
      // Copy the form values over the product object values
      let p = Object.assign({}, this.goalArea, this.goalAreaForm.value);

      this.goalAreaService.saveGoalArea(p)
        .subscribe(
        () => this.onSaveComplete(),
        (error: any) => this.onError(<any>error)
        );
    } else if (!this.goalAreaForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.snackBar.open('Successfully saved.', '', {
      duration: 3000,
    });

    // Reset the form to clear the flags
    this.goalAreaForm.reset();
    this.router.navigate(['/goal-areas']);
  }

  onError(error: any): void {
    this.snackBar.open(error, '', {
      duration: 3000,
    });
  }

}
