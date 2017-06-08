import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { ITrait } from './trait';

@Injectable()
export class TraitService {
  private baseUrl = 'http://localhost:1923/api/traits';

  constructor(private http: Http) { }

  getTraits(): Observable<ITrait[]> {
    return this.http.get(this.baseUrl)
      .map(this.extractData)
      .do(data => console.log('getTraits: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getTrait(id: number): Observable<ITrait> {
    if (id === 0) {
      return Observable.of(this.initializeTrait());
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

  deleteTrait(id: number): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, options)
      .do(data => console.log('deleteTrait: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  saveTrait(trait: ITrait): Observable<ITrait> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (trait.traitId === 0) {
      return this.createTrait(trait, options);
    }
    return this.updateTrait(trait, options);
  }

  private createTrait(trait: ITrait, options: RequestOptions): Observable<ITrait> {
    trait.traitId = undefined;
    return this.http.post(this.baseUrl, trait, options)
      .map(this.extractData)
      .do(data => console.log('createTrait: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updateTrait(trait: ITrait, options: RequestOptions): Observable<ITrait> {
    const url = `${this.baseUrl}/${trait.traitId}`;
    return this.http.put(url, trait, options)
      .map(() => trait)
      .do(data => console.log('updateTrait: ' + JSON.stringify(data)))
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

  initializeTrait(): ITrait {
    // Return an initialized object
    return {
      traitId: 0,
      traitName: null,
      traitDescription: null,
      positiveTrait: null
    };
  }

}
