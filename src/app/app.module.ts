import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import 'hammerjs';

/* Feature Modules */
import { TraitModule } from './trait/trait.module';
import { GoalModule } from './goal/goal.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    TraitModule,
    GoalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
