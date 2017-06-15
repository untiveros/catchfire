import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IIngredient } from './ingredient';

@Injectable()
export class IngredientService {
  private baseUrl = 'http://localhost:1923/api/ingredients';

  constructor(private http: Http) { }

  getIngredients(): Observable<IIngredient[]> {
    let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseUrl, options)
      .map(this.extractData)
      .do(data => console.log('getIngredients: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getIngredient(id: number): Observable<IIngredient> {
    if (id === 0) {
      return Observable.of(this.initializeIngredient());
      // return Observable.create((observer: any) => {
      //     observer.next(this.initializeProduct());
      //     observer.complete();
      // });
    };
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
      .map(this.extractData)
      .do(data => console.log('getIngredient: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteIngredient(id: number): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, options)
      .do(data => console.log('deleteIngredient: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  saveIngredient(ingredient: IIngredient): Observable<IIngredient> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (ingredient.ingredientId === 0) {
      return this.createIngredient(ingredient, options);
    }
    return this.updateIngredient(ingredient, options);
  }

  private createIngredient(ingredient: IIngredient, options: RequestOptions): Observable<IIngredient> {
    ingredient.ingredientId = undefined;
    return this.http.post(this.baseUrl, ingredient, options)
      .map(this.extractData)
      .do(data => console.log('createIngredient: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updateIngredient(ingredient: IIngredient, options: RequestOptions): Observable<IIngredient> {
    const url = `${this.baseUrl}/${ingredient.ingredientId}`;
    return this.http.put(url, ingredient, options)
      .map(() => ingredient)
      .do(data => console.log('updateIngredient: ' + JSON.stringify(data)))
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

  initializeIngredient(): IIngredient {
    // Return an initialized object
    return {
      ingredientId: 0,
      ingredientName: null,
      ingredientDescription: null
    };
  }

}
