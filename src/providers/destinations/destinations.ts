import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

//Native
import { HTTP } from '@ionic-native/http';
import {Platform} from "ionic-angular";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

//Providers
import {DeviceKeyProvider} from "../device-key/device-key";



@Injectable()
export class DestinationsProvider {

//Sw guardan aqui los tours
  HighlightedTours : HighlightedToursRest[] = [];
  MostVisitedTours : MostVisitedToursRest[] = [];

  constructor(private httpclient:HttpClient,
              private http: HTTP,
              //Detectamos en que plataforma estamos con este componente
              private plt: Platform,
              private DKP: DeviceKeyProvider) {

  }

  //Obtencion de tours para banner de inicio para android y ios
  getHighlightedToursData() {
    if(this.plt.is('cordova')) {
      this.http.setDataSerializer('json');
      this.http.get('http://rest.viajesolympus.com/api/v1/tours/highlighted',
        {lang:this.DKP.keys.lang.toString(), token: this.DKP.keys.devicetoken},
        {'x-api-key': this.DKP.keys.apikey,
        'content-type': 'application/json'})
        .then(data => {
          //this.HighlightedTours.map( data.data.tours);
          this.HighlightedTours = JSON.parse(data.data)['tours'];
         // data.data['tours'].map(this.HighlightedTours);
          console.log(data.status);
          console.log(data.data); // data received by server
          console.log(data.headers);

          console.log("Estos son los highlighted tours " + JSON.stringify(this.HighlightedTours));

          //console.log(data.data);

        })
        .catch(error => {
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });
    }else {
      let hdrs = new HttpHeaders({
        'x-api-key':this.DKP.keys.apikey,
        'Content-Type': 'application/json'
      });
      let promise = new Promise((resolve, reject) => {
        let apiURL = window.location.origin + '/api/v1/tours/highlighted?lang=' + this.DKP.keys.lang.toString() + '&token=' +  this.DKP.keys.devicetoken;
        this.httpclient.get(apiURL, {headers: hdrs})
          .toPromise()
          .then(
            res => { // Success
              this.HighlightedTours = res['tours'];
              console.log(this.HighlightedTours);
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

  //Obtener los tours para paginas de inicio para app web y nativo
  getMostVisitedToursData() {
    if(this.plt.is('cordova')) {
      this.http.setDataSerializer('json');
      this.http.get('http://rest.viajesolympus.com/api/v1/tours/mostvisited',
        {lang:this.DKP.keys.lang.toString(), token: this.DKP.keys.devicetoken},
        {'x-api-key': this.DKP.keys.apikey,
          'content-type': 'application/json'})
        .then(data => {
          this.MostVisitedTours = JSON.parse(data.data)['tours'];
          // data.data['tours'].map(this.HighlightedTours);
          console.log("Estos son los mas visitados tours " + JSON.stringify(this.MostVisitedTours));
          console.log(data.status);
          console.log(data.data); // data received by server
          console.log(data.headers);

        })
        .catch(error => {
          console.log("Estos son los mas visitados tours " + this.MostVisitedTours);
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });
    }else {
      let hdrs = new HttpHeaders({
        'x-api-key': this.DKP.keys.apikey,
        'Content-Type': 'application/json'
      });
      let promise = new Promise((resolve, reject) => {
        let apiURL = window.location.origin + '/api/v1/tours/mostvisited?lang=' + this.DKP.keys.lang.toString() + '&token=' + this.DKP.keys.devicetoken;
        this.httpclient.get(apiURL, {headers: hdrs})
          .toPromise()
          .then(
            res => { // Success
              this.MostVisitedTours = res['tours'];
              console.log(this.MostVisitedTours);
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

  //Manejo de errores
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}

//Interfaz de banner de tours de inicio
export interface HighlightedToursRest{
  id: string;
  imageUrl: string;
  name: string;
}

//Interfaz de Tours principales de inicio
export interface MostVisitedToursRest{
  image: string;
  destination: string;
  name: string;
  url: string;
}

