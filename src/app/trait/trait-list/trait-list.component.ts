import { Component, OnInit } from '@angular/core';

import { ITrait } from '../trait';
import { TraitService } from '../trait.service';

import { MdDialog, MdDialogRef, MdSnackBar } from "@angular/material";
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-trait-list',
  templateUrl: './trait-list.component.html',
  styleUrls: ['./trait-list.component.css']
})
export class TraitListComponent implements OnInit {
  pageTitle: string = 'Trait List';
  errorMessage: string;
  traits: ITrait[];

  constructor(private traitService: TraitService,
    public dialog: MdDialog,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.traitService.getTraits()
      .subscribe(traits => this.traits = traits,
      error => this.errorMessage = <any>error);
  }

  deleteTrait(trait: ITrait): void {
    if (trait.traitId === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      let dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result == 'delete') {
          this.traitService.deleteTrait(trait.traitId)
            .subscribe(
            () => this.removeItem(trait),
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

  removeItem(trait: ITrait): void {
    this.traits.splice(this.traits.indexOf(trait), 1);
  }
}
