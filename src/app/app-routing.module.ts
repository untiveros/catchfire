import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraitListComponent } from "./trait/trait-list/trait-list.component";

const routes: Routes = [
  {
    path: '',
    children: [],
    component: TraitListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
