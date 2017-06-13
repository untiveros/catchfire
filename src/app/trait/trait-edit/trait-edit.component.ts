import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TraitService } from '../trait.service';
import { ITrait } from '../trait';

import { MdSnackBar } from "@angular/material";

@Component({
  selector: 'app-trait-edit',
  templateUrl: './trait-edit.component.html',
  styleUrls: ['./trait-edit.component.css']
})
export class TraitEditComponent implements OnInit, OnDestroy {
  pageTitle: string;

  errorMessage: string;

  traitForm: FormGroup;
  trait: ITrait;
  private sub: Subscription;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private traitService: TraitService,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.traitForm = this.fb.group({
      traitName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      traitDescription: ['', [Validators.maxLength(500)]],
      positiveTrait: ['']
    });

    // Read the Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getTrait(id);
      }
    );



    const traitControl = this.traitForm.get('traitName');
    traitControl.valueChanges.debounceTime(1000).subscribe(value => this.traitSetMessage(traitControl));

    const traitDescriptionControl = this.traitForm.get('traitDescription');
    traitDescriptionControl.valueChanges.debounceTime(1000).subscribe(value => this.traitDescriptionSetMessage(traitDescriptionControl));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  traitMessage: string;
  private traitValidationMessages = {
    required: 'Please enter trait.',
    minlength: 'Minimum length is 3.',
    maxlength: 'Maximum length is 500.'
  };
  traitSetMessage(c: AbstractControl): void {
    this.traitMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.traitMessage = Object.keys(c.errors).map(key =>
        this.traitValidationMessages[key]).join(' ');
    }
  }

  traitDescriptionMessage: string;
  private traitDescriptionValidationMessages = {
    maxlength: 'Maximum length is 500.'
  };
  traitDescriptionSetMessage(c: AbstractControl): void {
    this.traitDescriptionMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.traitDescriptionMessage = Object.keys(c.errors).map(key =>
        this.traitDescriptionValidationMessages[key]).join(' ');
    }
  }








  getTrait(id: number): void {
    this.traitService.getTrait(id)
      .subscribe(
      (trait: ITrait) => this.onTraitRetrieved(trait),
      (error: any) => this.errorMessage = <any>error
      );
  }

  onTraitRetrieved(trait: ITrait): void {
    if (this.traitForm) {
      this.traitForm.reset();
    }
    this.trait = trait;

    if (this.trait.traitId === 0) {
      this.pageTitle = 'Add Trait';
    } else {
      this.pageTitle = `Edit Trait: ${this.trait.traitName}`;
    }

    // Update the data on the form
    this.traitForm.patchValue({
      traitName: this.trait.traitName,
      traitDescription: this.trait.traitDescription,
      positiveTrait: this.trait.positiveTrait
    });
  }

  saveTrait(): void {
    if (this.traitForm.dirty && this.traitForm.valid) {
      // Copy the form values over the product object values
      let p = Object.assign({}, this.trait, this.traitForm.value);

      this.traitService.saveTrait(p)
        .subscribe(
        () => this.onSaveComplete(),
        (error: any) => this.onError(<any>error)
        );
    } else if (!this.traitForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.snackBar.open('Successfully saved.', '', {
      duration: 3000,
    });

    // Reset the form to clear the flags
    this.traitForm.reset();
    this.router.navigate(['/traits']);
  }

  onError(error: any): void {
    this.snackBar.open(error, '', {
      duration: 3000,
    });
  }

}
