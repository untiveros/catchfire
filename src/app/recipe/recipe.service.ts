import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IRecipe } from './recipe';

@Injectable()
export class RecipeService {
  private baseUrl = 'http://localhost:1923/api/recipes';

  constructor(private http: Http) { }

  getRecipes(): Observable<IRecipe[]> {
    let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseUrl, options)
      .map(this.extractData)
      .do(data => console.log('getRecipes: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getRecipe(id: number): Observable<IRecipe> {
    if (id === 0) {
      return Observable.of(this.initializeRecipe());
      // return Observable.create((observer: any) => {
      //     observer.next(this.initializeProduct());
      //     observer.complete();
      // });
    };
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
      .map(this.extractData)
      .do(data => console.log('getRecipe: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteRecipe(id: number): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, options)
      .do(data => console.log('deleteRecipe: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  saveRecipe(recipe: IRecipe): Observable<IRecipe> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (recipe.recipeId === 0) {
      return this.createRecipe(recipe, options);
    }
    return this.updateRecipe(recipe, options);
  }

  private createRecipe(recipe: IRecipe, options: RequestOptions): Observable<IRecipe> {
    recipe.recipeId = undefined;
    return this.http.post(this.baseUrl, recipe, options)
      .map(this.extractData)
      .do(data => console.log('createRecipe: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updateRecipe(recipe: IRecipe, options: RequestOptions): Observable<IRecipe> {
    const url = `${this.baseUrl}/${recipe.recipeId}`;
    return this.http.put(url, recipe, options)
      .map(() => recipe)
      .do(data => console.log('updateRecipe: ' + JSON.stringify(data)))
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

  initializeRecipe(): IRecipe {
    // Return an initialized object
    return {
      recipeId: 0,
      recipeName: null,
      recipeDescription: null
    };
  }

}
