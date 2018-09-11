import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Platform} from "ionic-angular";
import {HTTP} from "@ionic-native/http";
import {DeviceKeyProvider} from "../device-key/device-key";
import {getPromise} from "@ionic-native/core";

@Injectable()
export class ToursProvider {
  CountriesColl: CountryRest[] = [];
  DestinationsColl : DestinationsRest[] = [];
  ToursColl : ToursRest[] = [];

  ApiKey:string = this.DKP.keys.apikey;

  constructor(private httpclient:HttpClient,
              private plt: Platform,
              private http: HTTP,
              private DKP: DeviceKeyProvider) {
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
    if(this.plt.is('cordova')){
      this.http.setDataSerializer('json');
      this.http.get('http://rest.viajesolympus.com/api/v1/countries?lang=' + this.DKP.keys.lang.toString() + '&token=' + this.DKP.keys.devicetoken,
        {},
        {'x-api-key': this.ApiKey,
        'content-type': 'application/json'})
        .then(data => {
          //this.HighlightedTours.map( data.data.tours);
          this.CountriesColl = JSON.parse(data.data)['countries'];
          // data.data['tours'].map(this.HighlightedTours);
          console.log("Estos son los paises " + JSON.stringify(this.CountriesColl));
          console.log(data.status);
          console.log(data.data); // data received by server
          console.log(data.headers);

          return getPromise
          //console.log(data.data);

        })
        .catch(error => {
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });
    }else {
      let hdrs = new HttpHeaders({
        'x-api-key': this.ApiKey,
        'Content-Type': 'application/json'
      });
      let promise = new Promise((resolve, reject) => {
        let apiURL = window.location.origin + '/api/v1/countries?lang=' + this.DKP.keys.lang.toString() + '&token=' + this.DKP.keys.devicetoken;
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
  }

  getDestinationsData(id:string) {
    if(this.plt.is('cordova')){
      this.http.setDataSerializer('json');
      this.http.get('http://rest.viajesolympus.com/api/v1/countries/'+ id + '/destinations?lang='+ this.DKP.keys.lang.toString() + '&token=' + this.DKP.keys.devicetoken,
        {},
        {'x-api-key': this.ApiKey,
        'content-type': 'application/json'})
        .then(data => {
          //this.HighlightedTours.map( data.data.tours);
          this.DestinationsColl = JSON.parse(data.data)['destinations'];
          // data.data['tours'].map(this.HighlightedTours);
          console.log("Estos son los destinos " + JSON.stringify(this.DestinationsColl));
          console.log(data.status);
          console.log(data.data); // data received by server
          console.log(data.headers);

          //console.log(data.data);

        })
        .catch(error => {
          console.log(error.status);
          console.log(error.data); // error message as string
          console.log(error.headers);

        });
    }else {
      let hdrs = new HttpHeaders({
        'x-api-key': this.ApiKey,
        'Content-Type': 'application/json'
      });
      let promise = new Promise((resolve, reject) => {
        let apiURL = window.location.origin + '/api/v1/countries/' + id + '/destinations?lang=' + this.DKP.keys.lang.toString() + '&token=' + this.DKP.keys.devicetoken;
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
  }

  getToursData(cityId:string) {
    console.log(cityId);
    if(this.plt.is('cordova')){
      this.http.setDataSerializer('json');
      this.http.get('http://rest.viajesolympus.com/api/v1/destinations/'+ cityId + '/tours?lang='+ this.DKP.keys.lang.toString() + '&token=' + this.DKP.keys.devicetoken,
        {},
        {'x-api-key': this.ApiKey,
        'content-type': 'application/json'})
        .then(data => {
          //this.HighlightedTours.map( data.data.tours);
          this.ToursColl = JSON.parse(data.data)['tours'];
          // data.data['tours'].map(this.HighlightedTours);
          console.log("Estos son los Tours a ofrecer " + JSON.stringify(this.ToursColl));

          //console.log(data.data);

        })
        .catch(error => {
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });
    }else {
      let hdrs = new HttpHeaders({
        'x-api-key': this.ApiKey,
        'Content-Type': 'application/json'
      });
      let promise = new Promise((resolve, reject) => {
        let apiURL = window.location.origin + '/api/v1/destinations/' + cityId + '/tours?lang=' + this.DKP.keys.lang.toString() + '&token=' + this.DKP.keys.devicetoken;
        this.httpclient.get(apiURL, {headers: hdrs})
          .toPromise()
          .then(
            res => { // Success
              this.ToursColl = res['tours'];
              console.log("Estos son los tours" + this.CountriesColl);
              resolve();
            },
            msg => { // Error
              reject(msg);
            }
          ).catch(this.handleError);
      });
      return promise;
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
export interface CountryRest{
  id : string;
  imageUrl : string;
  name : string;
}

export interface DestinationsRest{
  id : string;
  imageUrl : string;
  nombre : string;
}

export interface ToursRest{
  imageUrl : string;
  name : string;
  descripcion : string;
  tour_url : string;
  urlVideo : string;
}
