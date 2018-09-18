import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Platform} from "ionic-angular";
import {HTTP} from "@ionic-native/http";
import {DeviceKeyProvider} from "../device-key/device-key";
import {getPromise} from "@ionic-native/core";

@Injectable()
export class ToursProvider {

  //Guardamos los paises, destinos y tours por destinos
  CountriesColl: CountryRest[] = [];
  DestinationsColl : DestinationsRest[] = [];
  ToursColl : ToursRest[] = [];

  constructor(private httpclient:HttpClient,
              //Deteccion de plataforma
              private plt: Platform,
              //Manejo de peticiones desde un puerto aceptado
              private http: HTTP,
              private DKP: DeviceKeyProvider) {
  }

  //Obtenemos la informacion de paises disponibles para viajar para Android, iOS o web y regresa una promesa.
  getCountriesData() {
    if(this.plt.is('cordova')){
      this.http.setDataSerializer('json');
      this.http.get('http://rest.viajesolympus.com/api/v1/countries?lang=' + this.DKP.keys.lang.toString() + '&token=' + this.DKP.keys.devicetoken,
        {},
        {'x-api-key': this.DKP.keys.apikey,
        'content-type': 'application/json'})
        .then(data => {
          this.CountriesColl = JSON.parse(data.data)['countries'];
          return getPromise
        })
        .catch(error => {
          console.log(error);
        });
    }else {
      let hdrs = new HttpHeaders({
        'x-api-key': this.DKP.keys.apikey,
        'Content-Type': 'application/json'
      });
      let promise = new Promise((resolve, reject) => {
        let apiURL = window.location.origin + '/api/v1/countries?lang=' + this.DKP.keys.lang.toString() + '&token=' + this.DKP.keys.devicetoken;
        this.httpclient.get(apiURL, {headers: hdrs})
          .toPromise()
          .then(
            res => { // Success
              this.CountriesColl = res['countries'];
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

  //Obtenemos los destinos para el pais en Android, iOS o Web
  getDestinationsData(id:string) {
    if(this.plt.is('cordova')){
      this.http.setDataSerializer('json');
      this.http.get('http://rest.viajesolympus.com/api/v1/countries/'+ id + '/destinations?lang='+ this.DKP.keys.lang.toString() + '&token=' + this.DKP.keys.devicetoken,
        {},
        {'x-api-key': this.DKP.keys.apikey,
        'content-type': 'application/json'})
        .then(data => {
          this.DestinationsColl = JSON.parse(data.data)['destinations'];
        }).catch(error => {
          console.log(error);
        });
    }else {
      let hdrs = new HttpHeaders({
        'x-api-key': this.DKP.keys.apikey,
        'Content-Type': 'application/json'
      });
      let promise = new Promise((resolve, reject) => {
        let apiURL = window.location.origin + '/api/v1/countries/' + id + '/destinations?lang=' + this.DKP.keys.lang.toString() + '&token=' + this.DKP.keys.devicetoken;
        this.httpclient.get(apiURL, {headers: hdrs})
          .toPromise()
          .then(
            res => { // Success
              this.DestinationsColl = res['destinations'];
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

  //Obtenemos toda la informacion de los tours en iOS, Android o Web
  getToursData(cityId:string) {
    console.log(cityId);
    if(this.plt.is('cordova')){
      this.http.setDataSerializer('json');
      this.http.get('http://rest.viajesolympus.com/api/v1/destinations/'+ cityId + '/tours?lang='+ this.DKP.keys.lang.toString() + '&token=' + this.DKP.keys.devicetoken,
        {},
        {'x-api-key': this.DKP.keys.apikey,
        'content-type': 'application/json'})
        .then(data => {
          this.ToursColl = JSON.parse(data.data)['tours'];
        }).catch(error => {
          console.log(error);
        });
    }else {
      let hdrs = new HttpHeaders({
        'x-api-key': this.DKP.keys.apikey,
        'Content-Type': 'application/json'
      });
      let promise = new Promise((resolve, reject) => {
        let apiURL = window.location.origin + '/api/v1/destinations/' + cityId + '/tours?lang=' + this.DKP.keys.lang.toString() + '&token=' + this.DKP.keys.devicetoken;
        this.httpclient.get(apiURL, {headers: hdrs})
          .toPromise()
          .then(
            res => { // Success
              this.ToursColl = res['tours'];
              resolve();
            },
            msg => { // Error
              reject(msg);
            }).catch(this.handleError);
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

//Interfaz para el manejo de informacion para los paises
export interface CountryRest{
  id : string;
  imageUrl : string;
  name : string;
}

//Interfaz para el manejo de informacion de los destinos
export interface DestinationsRest{
  id : string;
  imageUrl : string;
  nombre : string;
}

//Manejo de informacion de Tour del destino
export interface ToursRest{
  imageUrl : string;
  name : string;
  descripcion : string;
  tour_url : string;
  urlVideo : string;
}
