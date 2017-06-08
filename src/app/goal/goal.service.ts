import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IGoal } from './goal';

@Injectable()
export class GoalService {
  private baseUrl = 'http://localhost:1923/api/goals';

  constructor(private http: Http) { }

  getGoals(): Observable<IGoal[]> {
    return this.http.get(this.baseUrl)
      .map(this.extractData)
      .do(data => console.log('getGoals: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getGoal(id: number): Observable<IGoal> {
    if (id === 0) {
      return Observable.of(this.initializeGoal());
      // return Observable.create((observer: any) => {
      //     observer.next(this.initializeProduct());
      //     observer.complete();
      // });
    };
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
      .map(this.extractData)
      .do(data => console.log('getTrait: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteGoal(id: number): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, options)
      .do(data => console.log('deleteGoal: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  saveGoal(goal: IGoal): Observable<IGoal> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (goal.goalId === 0) {
      return this.createGoal(goal, options);
    }
    return this.updateGoal(goal, options);
  }

  private createGoal(goal: IGoal, options: RequestOptions): Observable<IGoal> {
    goal.goalId = undefined;
    return this.http.post(this.baseUrl, goal, options)
      .map(this.extractData)
      .do(data => console.log('createGoal: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updateGoal(goal: IGoal, options: RequestOptions): Observable<IGoal> {
    const url = `${this.baseUrl}/${goal.goalId}`;
    return this.http.put(url, goal, options)
      .map(() => goal)
      .do(data => console.log('updateGoal: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    let body = <any[]>response.json();
    return body || {};
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  initializeGoal(): IGoal {
    // Return an initialized object
    return {
      goalId: 0,
      goalName: null,
      goalDescription: null,
      goalAreaId: null
    };
  }

}
