import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {HTTP} from "@ionic-native/http";
import {Platform} from "ionic-angular";
import {DeviceKeyProvider} from "../device-key/device-key";

@Injectable()
export class ContactoProvider {
  //Arreglo de contactos
  ContactosColl : ContactoRest[] = [];
  //Api key por dispositivo
  ApiKey:string = this.DKP.keys.apikey;

  constructor(private httpclient: HttpClient,
              private plt: Platform,
              private http: HTTP,
              private DKP: DeviceKeyProvider) {

    //Si no hay apikey pedirlo de nuevo
    if(this.DKP.keys.devicetoken == ""){
      this.DKP.getDeviceApiKey();
    }
  }

//Se obitenen los contactos para web o nativo
  getContactosData() {
    console.log("Este es el device token " + this.DKP.keys.devicetoken);
    if(this.plt.is('cordova')){
      this.http.get('http://rest.viajesolympus.com/api/v1/countries/contact?lang=' +
        this.DKP.keys.lang.toString() + '&token=' +
        this.DKP.keys.devicetoken,
        {},
        {'x-api-key': this.DKP.keys.apikey,
          'Content-Type': 'application/json'})
        .then(data => {
          this.ContactosColl = JSON.parse(data.data)['offices'];
          console.log("Estos son los contactos " + JSON.stringify(this.ContactosColl));
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
        let apiURL = window.location.origin + '/api/v1/countries/contact?lang=' +
          this.DKP.keys.lang.toString() + '&token=' +
          this.DKP.keys.devicetoken;
        this.httpclient.get(apiURL,  {headers: hdrs})
          .toPromise()
          .then(
            res => { // Success
              this.ContactosColl = res['offices'];
              console.log(this.ContactosColl);
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

//Interfaz de contacto para prevenir problemas
export interface ContactoRest {
  code: string;
  name: string;
  international_phone: string;
  domestic_phone: string;
  whatsapp: string;
  default_whatsapp_msg: string;
  emoji:string;
}
