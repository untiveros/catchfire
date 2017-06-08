import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraitRoutingModule } from './trait-routing.module';
import { TraitListComponent } from './trait-list/trait-list.component';
import { TraitDetailComponent } from './trait-detail/trait-detail.component';
import { TraitEditComponent } from './trait-edit/trait-edit.component';

import { SharedModule } from '../shared/shared.module';

import { TraitService } from './trait.service';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { TraitData } from './trait-data';

@NgModule({
  imports: [
    // InMemoryWebApiModule.forRoot(TraitData),
    CommonModule,
    TraitRoutingModule,
    SharedModule
  ],
  declarations: [TraitListComponent, TraitDetailComponent, TraitEditComponent],
  providers: [
    TraitService
  ]
})
export class TraitModule { }
