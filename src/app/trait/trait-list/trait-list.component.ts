import { Component, OnInit } from '@angular/core';

import { ITrait } from '../trait';
import { TraitService } from '../trait.service';

@Component({
  selector: 'app-trait-list',
  templateUrl: './trait-list.component.html',
  styleUrls: ['./trait-list.component.css']
})
export class TraitListComponent implements OnInit {
  pageTitle: string = 'Trait List';
  errorMessage: string;
  traits: ITrait[];

  constructor(private traitService: TraitService) { }

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
      if (confirm(`Really delete the trait: ${trait.traitName}?`)) {
        this.traitService.deleteTrait(trait.traitId)
          .subscribe(
          () => this.removeItem(trait),
          (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  onSaveComplete(): void {

  }

  removeItem(trait: ITrait): void {
    this.traits.splice(this.traits.indexOf(trait), 1);
  }
}
