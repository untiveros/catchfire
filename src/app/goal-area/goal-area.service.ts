import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IGoalArea } from './goal-area';

@Injectable()
export class GoalAreaService {
  private baseUrl = 'http://localhost:1923/api/goalareas';

  constructor(private http: Http) { }

  getGoalAreas(): Observable<IGoalArea[]> {
    let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseUrl, options)
      .map(this.extractData)
      .do(data => console.log('getGoalAreas: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getGoalArea(id: number): Observable<IGoalArea> {
    if (id === 0) {
      return Observable.of(this.initializeGoalArea());
      // return Observable.create((observer: any) => {
      //     observer.next(this.initializeProduct());
      //     observer.complete();
      // });
    };
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
      .map(this.extractData)
      .do(data => console.log('getGoalArea: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteGoalArea(id: number): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, options)
      .do(data => console.log('deleteGoalArea: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  saveGoalArea(goalArea: IGoalArea): Observable<IGoalArea> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (goalArea.goalAreaId === 0) {
      return this.createGoalArea(goalArea, options);
    }
    return this.updateGoalArea(goalArea, options);
  }

  private createGoalArea(goalArea: IGoalArea, options: RequestOptions): Observable<IGoalArea> {
    goalArea.goalAreaId = undefined;
    return this.http.post(this.baseUrl, goalArea, options)
      .map(this.extractData)
      .do(data => console.log('createGoalArea: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updateGoalArea(goalArea: IGoalArea, options: RequestOptions): Observable<IGoalArea> {
    const url = `${this.baseUrl}/${goalArea.goalAreaId}`;
    return this.http.put(url, goalArea, options)
      .map(() => goalArea)
      .do(data => console.log('updateGoalArea: ' + JSON.stringify(data)))
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

  initializeGoalArea(): IGoalArea {
    // Return an initialized object
    return {
      goalAreaId: 0,
      goalAreaName: null,
      goalAreaDescription: null
    };
  }

}
