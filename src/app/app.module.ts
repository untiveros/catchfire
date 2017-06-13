import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import 'hammerjs';

/* Feature Modules */
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { TraitModule } from './trait/trait.module';
import { GoalModule } from './goal/goal.module';
import { GoalAreaModule } from './goal-area/goal-area.module';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    TraitModule,
    GoalModule,
    GoalAreaModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDeleteDialogComponent
  ]
})
export class AppModule { }
