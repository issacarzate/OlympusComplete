import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";

/*
  Generated class for the ToursProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToursProvider {
  CountriesColl: CountryRest[] = [];
  DestinationsColl : DestinationsRest[] = [];
  ToursColl : ToursRest[] = [];

  constructor(private httpclient:HttpClient) {
  }
  /*AuthorizationHeader(header: Headers) {
    header.append('x-api-key', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYW5nIjoyLCJpYXQiOjE1MzE4NTc1ODUsImV4cCI6MTU2MzM5MzU4NX0.tJN_m8n6sFD8to3JAXcVvdQ_WBH4xw8XUu-2a-HSCkM`);

  }

  getCountries(){
    //const header = new Headers();
    let hdrs = new HttpHeaders({ 'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYW5nIjoyLCJpYXQiOjE1MzE4NTc1ODUsImV4cCI6MTU2MzM5MzU4NX0.tJN_m8n6sFD8to3JAXcVvdQ_WBH4xw8XUu-2a-HSCkM', 'Content-Type':  'application/json' });
    //this.AuthorizationHeader(header);
   return this.httpclient.get(this.countriesURL, {headers: hdrs}).map((response:Response)=> this.CountriesColl = response.json());
  }

  getCountriesSecond() {
    return new Promise(resolve => {
      this.httpclient.get(this.countriesURL, {headers: new HttpHeaders().set("x-api-key", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYW5nIjoyLCJpYXQiOjE1MzE4NTc1ODUsImV4cCI6MTU2MzM5MzU4NX0.tJN_m8n6sFD8to3JAXcVvdQ_WBH4xw8XUu-2a-HSCkM")}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getTestData() {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `https://reqres.in/api/unknown`;
      this.httpclient.get(apiURL)
        .toPromise()
        .then(
          res => { // Success
            this.SampleColl = res['data'];
            console.log(res);
            console.log(this.SampleColl);
            resolve();
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
    return promise;
  }
*/
  getCountriesData() {
    let hdrs = new HttpHeaders({ 'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYW5nIjoyLCJpYXQiOjE1MzE4NTc1ODUsImV4cCI6MTU2MzM5MzU4NX0.tJN_m8n6sFD8to3JAXcVvdQ_WBH4xw8XUu-2a-HSCkM', 'Content-Type':  'application/json' });
    let promise = new Promise((resolve, reject) => {
      let apiURL = window.location.origin + '/api/v1/countries';
      this.httpclient.get(apiURL, {headers: hdrs})
        .toPromise()
        .then(
          res => { // Success
            this.CountriesColl = res['countries'];
            console.log(this.CountriesColl);
            resolve();
          },
          msg => { // Error
            reject(msg);
          }
        ).catch(this.handleError);
    });
    return promise;
  }

  getDestinationsData(id:string) {
    let hdrs = new HttpHeaders({ 'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYW5nIjoyLCJpYXQiOjE1MzE4NTc1ODUsImV4cCI6MTU2MzM5MzU4NX0.tJN_m8n6sFD8to3JAXcVvdQ_WBH4xw8XUu-2a-HSCkM', 'Content-Type':  'application/json' });
    let promise = new Promise((resolve, reject) => {
      let apiURL = window.location.origin + '/api/v1/countries/' + id + '/destinations';
      this.httpclient.get(apiURL, {headers: hdrs})
        .toPromise()
        .then(
          res => { // Success
            this.DestinationsColl = res['destinations'];
            console.log(this.CountriesColl);
            resolve();
          },
          msg => { // Error
            reject(msg);
          }
        ).catch(this.handleError);
    });
    return promise;
  }

  getToursData(cityId:string) {
    let hdrs = new HttpHeaders({ 'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYW5nIjoyLCJpYXQiOjE1MzE4NTc1ODUsImV4cCI6MTU2MzM5MzU4NX0.tJN_m8n6sFD8to3JAXcVvdQ_WBH4xw8XUu-2a-HSCkM', 'Content-Type':  'application/json' });
    let promise = new Promise((resolve, reject) => {
      let apiURL = window.location.origin + '/api/v1/destinations/' + cityId + '/tours';
      this.httpclient.get(apiURL, {headers: hdrs})
        .toPromise()
        .then(
          res => { // Success
            this.ToursColl = res['tours'];
            console.log(this.CountriesColl);
            resolve();
          },
          msg => { // Error
            reject(msg);
          }
        ).catch(this.handleError);
    });
    return promise;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
export interface CountryRest{
  id : string;
  image : string;
  name : string;
}

export interface DestinationsRest{
  id : string;
  image : string;
  nombre : string;
}

export interface ToursRest{
  image : string;
  name : string;
  description : string;
  urlBuy : string;
  urlVideo : string;
}
