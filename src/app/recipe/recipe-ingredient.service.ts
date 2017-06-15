import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IRecipeIngredient } from './recipe-ingredient';

@Injectable()
export class RecipeIngredientService {
  private baseUrl = 'http://localhost:1923/api/vwrecipeingredients';

  constructor(private http: Http) { }

  getRecipeIngredients(): Observable<IRecipeIngredient[]> {
    let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseUrl, options)
      .map(this.extractData)
      .do(data => console.log('getRecipes: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getRecipeIngredient(id: number): Observable<IRecipeIngredient> {
    if (id === 0) {
      return Observable.of(this.initializeRecipeIngredient());
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

  deleteRecipeIngredient(id: number): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, options)
      .do(data => console.log('deleteRecipe: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  saveRecipeIngredient(recipeIngredient: IRecipeIngredient): Observable<IRecipeIngredient> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (recipeIngredient.recipeId === 0) {
      return this.createRecipeIngredient(recipeIngredient, options);
    }
    return this.updateRecipeIngredient(recipeIngredient, options);
  }

  private createRecipeIngredient(recipeIngredient: IRecipeIngredient, options: RequestOptions): Observable<IRecipeIngredient> {
    recipeIngredient.recipeId = undefined;
    return this.http.post(this.baseUrl, recipeIngredient, options)
      .map(this.extractData)
      .do(data => console.log('createRecipe: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updateRecipeIngredient(recipeIngredient: IRecipeIngredient, options: RequestOptions): Observable<IRecipeIngredient> {
    const url = `${this.baseUrl}/${recipeIngredient.recipeId}`;
    return this.http.put(url, recipeIngredient, options)
      .map(() => recipeIngredient)
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

  initializeRecipeIngredient(): IRecipeIngredient {
    // Return an initialized object
    return {
      recipeIngredientId: 0,
      recipeId: 0,
      recipeName: null,
      recipeDescription: null,
      ingredientId: 0,
      ingredientName: null,
      ingredientDescription: null
    };
  }

}
