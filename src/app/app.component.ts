import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CatchFire';
  navLinks = [['/', 'HOME'], ['/traits', 'TRAITS'], ['/goals', 'GOALS'], ['/goal-areas', 'GOAL AREAS'], ['/ingredients', 'INGREDIENTS'], ['/recipes', 'RECIPES']];
}
